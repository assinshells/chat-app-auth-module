import { create } from "zustand";
import { loginRequest } from "@features/auth/login/api/login.api.js";
import { TokenStorage } from "@shared/lib/tokenStorage.js";

export const useLoginStore = create((set) => ({
  loading: false,
  error: null,

  login: async ({ login, password }, onSuccess) => {
    set({ loading: true, error: null });
    try {
      const data = await loginRequest({ login, password });
      TokenStorage.setTokens(data);
      onSuccess();
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null }),
}));