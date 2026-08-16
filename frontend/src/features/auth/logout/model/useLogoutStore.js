import { create } from "zustand";
import { logoutRequest } from "@features/auth/logout/api/logout.api.js";
import { TokenStorage } from "@shared/lib/tokenStorage.js";

export const useLogoutStore = create((set) => ({
  loading: false,

  logout: async (onSuccess) => {
    set({ loading: true });
    try {
      await logoutRequest(TokenStorage.getRefreshToken());
    } catch {
      // Игнорируем — refresh-токен может быть уже истекшим/отозванным
    } finally {
      TokenStorage.clearTokens();
      set({ loading: false });
      onSuccess();
    }
  },
}));