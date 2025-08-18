import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'staff' | 'client')[];
  allowedScopes?: ('kitchen' | 'floor')[];
  redirectTo?: string;
}

export function AuthGuard({ 
  children, 
  allowedRoles = [], 
  allowedScopes = [], 
  redirectTo 
}: AuthGuardProps) {
  const { isAuthenticated, user, table, checkAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Not authenticated
  if (!isAuthenticated) {
    if (redirectTo) {
      return <Navigate to={redirectTo} replace />;
    }
    
    // Determine redirect based on current path
    const path = location.pathname;
    if (path.startsWith('/admin')) {
      return <Navigate to="/admin/login" replace />;
    }
    if (path.startsWith('/staff')) {
      return <Navigate to="/staff/login" replace />;
    }
    if (path.startsWith('/kds')) {
      return <Navigate to="/kds/login" replace />;
    }
    if (path.startsWith('/client')) {
      return <Navigate to="/client/login" replace />;
    }
    
    return <Navigate to="/" replace />;
  }

  // Check role-based access
  if (allowedRoles.length > 0) {
    const userRole = user?.role || (table ? 'client' : null);
    if (!userRole || !allowedRoles.includes(userRole)) {
      return <Navigate to="/" replace />;
    }
  }

  // Check scope-based access (for staff)
  if (allowedScopes.length > 0 && user?.role === 'staff') {
    if (!user.scope || !allowedScopes.includes(user.scope)) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}

// Convenience components for specific guards
export function AdminGuard({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={['admin']} redirectTo="/admin/login">
      {children}
    </AuthGuard>
  );
}

export function StaffGuard({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={['staff']} redirectTo="/staff/login">
      {children}
    </AuthGuard>
  );
}

export function KDSGuard({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={['staff']} allowedScopes={['kitchen']} redirectTo="/kds/login">
      {children}
    </AuthGuard>
  );
}

export function ClientGuard({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={['client']} redirectTo="/client/login">
      {children}
    </AuthGuard>
  );
}