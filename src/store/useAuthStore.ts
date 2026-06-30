import { create } from 'zustand';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  setAuth: (user: User, accessToken: string) => void;
  updateUser: (user: Partial<User>) => void;
  clearAuth: () => void;
  setIsInitializing: (val: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isInitializing: true,
  setAuth: (user, accessToken) => set({ user, accessToken, isAuthenticated: true, isInitializing: false }),
  updateUser: (userUpdates) => set((state) => ({ 
    user: state.user ? { ...state.user, ...userUpdates } : null 
  })),
  clearAuth: () => set({ user: null, accessToken: null, isAuthenticated: false, isInitializing: false }),
  setIsInitializing: (val) => set({ isInitializing: val }),
}));
