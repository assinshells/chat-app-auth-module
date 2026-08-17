import { COOKIE_NAMES } from "../constants/auth.constants.js";
import { authConfig } from "../config/auth.config.js";
import { env } from "../config/env.js";

/**
 * CookieProvider — единственная точка установки/очистки auth-cookies.
 *
 * refreshToken: httpOnly, недоступен из JS — защищает от кражи через XSS.
 * csrfToken: НЕ httpOnly (сознательно) — double-submit-cookie паттерн
 * требует, чтобы клиент мог прочитать его и продублировать в заголовке
 * X-CSRF-Token; сравнение cookie === header в middlewares/csrf.middleware.js
 * подтверждает, что запрос пришёл не с чужого сайта (сторонний сайт не
 * может прочитать чужие cookies, а значит не сможет подставить верный
 * заголовок).
 *
 * Обе cookie ограничены path: "/api/auth" — они нужны только auth-роутам
 * (refresh/logout), поэтому не должны отправляться с любым другим запросом.
 */
const baseCookieOptions = {
  path: "/api/auth",
  secure: env.isProduction,
  sameSite: "strict",
  maxAge: authConfig.jwt.refreshToken.ttlSeconds * 1000,
};

export const CookieProvider = {
  setAuthCookies(res, { refreshToken, csrfToken }) {
    res.cookie(COOKIE_NAMES.refreshToken, refreshToken, {
      ...baseCookieOptions,
      httpOnly: true,
    });
    res.cookie(COOKIE_NAMES.csrfToken, csrfToken, {
      ...baseCookieOptions,
      httpOnly: false,
    });
  },

  clearAuthCookies(res) {
    res.clearCookie(COOKIE_NAMES.refreshToken, { path: "/api/auth" });
    res.clearCookie(COOKIE_NAMES.csrfToken, { path: "/api/auth" });
  },
};
