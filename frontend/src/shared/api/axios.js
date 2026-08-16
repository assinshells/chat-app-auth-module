import axios from "axios";
import { TokenStorage } from "@shared/lib/tokenStorage.js";

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  console.error("[axios] VITE_API_URL is not set. API calls will fail.");
}

export const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Отдельный инстанс без интерсепторов — иначе запрос на /refresh,
// получивший 401, сам попадёт в обработчик ниже и зациклится.
const refreshClient = axios.create({ baseURL: apiUrl, timeout: 10000 });

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = TokenStorage.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const normalizeError = (error) => {
  const message =
    error.response?.data?.error?.message ||
    (typeof error.response?.data?.error === "string"
      ? error.response.data.error
      : null) ||
    error.message ||
    "Request failed";

  const code = error.response?.data?.error?.code || "UNKNOWN_ERROR";
  const status = error.response?.status ?? 0;

  const normalized = new Error(message);
  normalized.code = code;
  normalized.status = status;
  return normalized;
};

// Пока идёт обновление access-токена, все параллельные 401-запросы
// ждут один и тот же промис вместо того, чтобы каждый бил в /refresh
// своим собственным (просроченным) refresh-токеном.
let refreshPromise = null;

const AUTH_ENDPOINTS_WITHOUT_RETRY = ["/api/auth/login", "/api/auth/refresh"];

const refreshAccessToken = () => {
  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post("/api/auth/refresh", {
        refreshToken: TokenStorage.getRefreshToken(),
      })
      .then(({ data }) => {
        TokenStorage.setTokens(data);
        return data.accessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const isAuthEndpoint = AUTH_ENDPOINTS_WITHOUT_RETRY.some((path) =>
      config?.url?.includes(path),
    );

    const canRetry =
      response?.status === 401 &&
      !config._retried &&
      !isAuthEndpoint &&
      Boolean(TokenStorage.getRefreshToken());

    if (!canRetry) {
      return Promise.reject(normalizeError(error));
    }

    config._retried = true;

    try {
      const accessToken = await refreshAccessToken();
      config.headers.Authorization = `Bearer ${accessToken}`;
      return apiClient(config);
    } catch (refreshError) {
      // Refresh-токен тоже недействителен — сессия завершена окончательно.
      TokenStorage.clearTokens();
      window.location.reload();
      return Promise.reject(normalizeError(refreshError));
    }
  },
);