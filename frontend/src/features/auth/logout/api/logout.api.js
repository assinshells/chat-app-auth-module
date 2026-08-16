import { apiClient } from "@shared/api/axios.js";

/**
 * @param {string} refreshToken
 * @returns {Promise<{ success: boolean }>}
 */
export const logoutRequest = (refreshToken) =>
  apiClient.post("/api/auth/logout", { refreshToken }).then((r) => r.data);