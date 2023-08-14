import { Response } from 'express';
import { Tokens } from '../types';

/**
 * Установка jwt токенов в куки
 */
export function setTokenCookies(res: Response, tokens: Tokens): void {
  res.cookie('access_token', tokens.accessToken, { httpOnly: true, sameSite: 'strict', secure: true });
  res.cookie('refresh_token', tokens.refreshToken);
}

/**
 * Удаление jwt токенов из куки
 */
export function removeTokenCookies(res: Response): void {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
}
