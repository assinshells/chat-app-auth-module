import { apiClient } from "@shared/api/axios.js";

/**
 * @returns {Promise<{ success: boolean }>}
 */
export const logoutRequest = () =>
  apiClient.post("/api/auth/logout", {}).then((r) => r.data);