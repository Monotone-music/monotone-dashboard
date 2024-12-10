import { AuthState } from "@/interface/AuthState";
import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useAuthStore = create<AuthState>()(
  persist(
      (set) => ({
          isAuthenticated: false,
          token: null,
          refreshToken: null,
          error: null,
          user: null,
          setIsAuthenticated: (authStatus) => set({ isAuthenticated: authStatus }),
          setToken: (token) => set({ token }),
          setRefreshToken: (refreshToken) => set({refreshToken}),
          setError: (errorMessage) => set({ error: errorMessage }),
          clearAuthState: () => set({ isAuthenticated: false, token: null, error: null }),
          logout: () => set({ user: null, token: null, isAuthenticated: false }),
        }),
        {
          name: 'auth-storage', // Key used for storing in localStorage
        }
  )
);