import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockApi } from '@/lib/mockApi';
import { verifyJWT } from '@/lib/utils';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'staff' | 'client';
  scope?: 'kitchen' | 'floor';
}

interface Table {
  id: string;
  number: number;
  token: string;
  pin: string;
  status: 'free' | 'occupied' | 'reserved';
  capacity: number;
}

interface AuthState {
  token: string | null;
  user: User | null;
  table: Table | null;
  isAuthenticated: boolean;
  loading: boolean;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  loginTable: (tableNumber: number, pin: string) => Promise<void>;
  loginWithQR: (tableToken: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // State
      token: null,
      user: null,
      table: null,
      isAuthenticated: false,
      loading: false,

      // Actions
      login: async (email: string, password: string) => {
        set({ loading: true });
        try {
          const result = await mockApi.login(email, password);
          set({
            token: result.token,
            user: result.user,
            table: null,
            isAuthenticated: true,
            loading: false
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      loginTable: async (tableNumber: number, pin: string) => {
        set({ loading: true });
        try {
          const result = await mockApi.loginTable(tableNumber, pin);
          set({
            token: result.token,
            user: null,
            table: result.table,
            isAuthenticated: true,
            loading: false
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      loginWithQR: async (tableToken: string) => {
        set({ loading: true });
        try {
          const result = await mockApi.loginWithQR(tableToken);
          set({
            token: result.token,
            user: null,
            table: result.table,
            isAuthenticated: true,
            loading: false
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          token: null,
          user: null,
          table: null,
          isAuthenticated: false,
          loading: false
        });
      },

      checkAuth: () => {
        const { token } = get();
        if (!token) {
          set({ isAuthenticated: false });
          return;
        }

        try {
          const payload = verifyJWT(token);
          set({ isAuthenticated: true });
        } catch {
          set({
            token: null,
            user: null,
            table: null,
            isAuthenticated: false
          });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        table: state.table
      })
    }
  )
);