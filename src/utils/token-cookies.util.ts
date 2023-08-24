import { CookieOptions, Response } from 'express';
import { Tokens } from '../types';

/**
 * Установка jwt токенов в куки
 */
export function setTokenCookies(res: Response, tokens: Tokens, cookieOptions?: CookieOptions): void {
  res.cookie('access_token', tokens.accessToken, { secure: true, domain: '.slonum.ru', ...cookieOptions });
  res.cookie('refresh_token', tokens.refreshToken, { secure: true, httpOnly: true, domain: '.slonum.ru', ...cookieOptions });
}

/**
 * Удаление jwt токенов из куки
 */
export function removeTokenCookies(res: Response, cookieOptions?: CookieOptions): void {
  res.clearCookie('access_token', { domain: '.slonum.ru', ...cookieOptions });
  res.clearCookie('refresh_token', { domain: '.slonum.ru', ...cookieOptions });
}
