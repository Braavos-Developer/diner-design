import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Mock utilities for auth and IDs
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

export function hashPassword(password: string): string {
  // Mock hash function - in real app use bcrypt
  return `hashed_${btoa(password)}`;
}

export function verifyPassword(password: string, hashedPassword: string): boolean {
  return hashedPassword === `hashed_${btoa(password)}`;
}

export function generateJWT(payload: any): string {
  // Mock JWT - in real app use proper JWT library
  const mockPayload = {
    ...payload,
    exp: payload.exp || Date.now() + 8 * 60 * 60 * 1000, // 8 hours
    iat: Date.now()
  };
  return `mock_jwt_${btoa(JSON.stringify(mockPayload))}`;
}

export function verifyJWT(token: string): any {
  try {
    if (!token.startsWith('mock_jwt_')) {
      throw new Error('Invalid token format');
    }
    
    const payload = JSON.parse(atob(token.replace('mock_jwt_', '')));
    
    if (payload.exp < Date.now()) {
      throw new Error('Token expired');
    }
    
    return payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export function getTimeElapsed(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  
  if (diffMins < 60) {
    return `${diffMins}min`;
  }
  
  const hours = Math.floor(diffMins / 60);
  const mins = diffMins % 60;
  return `${hours}h ${mins}min`;
}
