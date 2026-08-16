import { apiClient } from "@shared/api/axios.js";

/**
 * @param {{ login: string, password: string }} dto
 * @returns {Promise<{ accessToken: string, refreshToken: string }>}
 */
export const loginRequest = (dto) =>
  apiClient.post("/api/auth/login", dto).then((r) => r.data);