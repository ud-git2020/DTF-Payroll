import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  userId: string;
  name: string;
  company: string;
}

interface AuthState {
  user: User | null;
  login: (userId: string, password: string, company: string) => boolean;
  logout: () => void;
}

/**
 * Mock auth. Any non-empty credentials succeed (dummy mode).
 * Persisted to localStorage so a refresh keeps you signed in.
 */
export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (userId, password, company) => {
        if (!userId.trim() || !password.trim()) return false;
        set({
          user: {
            userId,
            name: userId.charAt(0).toUpperCase() + userId.slice(1),
            company,
          },
        });
        return true;
      },
      logout: () => set({ user: null }),
    }),
    { name: 'dtf-auth' }
  )
);
