import { TokenProvider } from "../providers/token.provider.js";
import { TokenRepository } from "../repositories/token.repository.js";
import { RefreshTokenInvalidException } from "../exceptions/auth.exceptions.js";

export const TokenService = {
  /**
   * Выпускает новую пару access/refresh токенов и регистрирует
   * refresh-токен в whitelist (Redis), чтобы его можно было отозвать.
   */
  async issueTokenPair(userId) {
    const accessToken = TokenProvider.signAccessToken(userId);
    const { token: refreshToken, jti } = TokenProvider.signRefreshToken(userId);
    await TokenRepository.saveRefreshToken(jti, userId);
    return { accessToken, refreshToken };
  },

  /**
   * Ротация refresh-токена: проверяет подпись/срок действия JWT,
   * убеждается, что jti ещё не отозван, аннулирует старый токен и
   * выпускает новую пару. Однократное использование refresh-токена
   * снижает ущерб от его утечки (replay после первого использования
   * будет отклонён).
   */
  async rotateRefreshToken(refreshToken) {
    let payload;
    try {
      payload = TokenProvider.verifyRefreshToken(refreshToken);
    } catch {
      throw new RefreshTokenInvalidException();
    }

    const storedUserId = await TokenRepository.findUserIdByJti(payload.jti);
    if (!storedUserId || storedUserId !== String(payload.sub)) {
      throw new RefreshTokenInvalidException();
    }

    await TokenRepository.deleteRefreshToken(payload.jti);
    return this.issueTokenPair(payload.sub);
  },

  /**
   * Отзывает refresh-токен (logout). Тихо завершается, если токен
   * уже невалиден/просрочен/отсутствует — logout должен быть идемпотентным.
   */
  async revokeRefreshToken(refreshToken) {
    if (!refreshToken) return;
    try {
      const payload = TokenProvider.verifyRefreshToken(refreshToken);
      await TokenRepository.deleteRefreshToken(payload.jti);
    } catch {
      // токен уже истёк/невалиден — отзывать нечего
    }
  },
};