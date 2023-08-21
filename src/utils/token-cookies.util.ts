import { CookieOptions, Response } from 'express';
import { Tokens } from '../types';

/**
 * Установка jwt токенов в куки
 */
export function setTokenCookies(res: Response, tokens: Tokens, cookieOptions?: CookieOptions): void {
  if (process.env.NODE_ENV === 'development') {
    res.cookie('access_token', tokens.accessToken, { secure: true, domain: '.slonum.ru', ...cookieOptions });
    res.cookie('refresh_token', tokens.refreshToken, { secure: true, httpOnly: true, domain: '.slonum.ru', ...cookieOptions });
    res.cookie('access_token', tokens.accessToken, { secure: true, domain: 'localhost', ...cookieOptions });
    res.cookie('refresh_token', tokens.refreshToken, { secure: true, httpOnly: true, domain: 'localhost', ...cookieOptions });
  } else {
    res.cookie('access_token', tokens.accessToken, { secure: true, domain: '.slonum.ru', ...cookieOptions });
    res.cookie('refresh_token', tokens.refreshToken, { secure: true, httpOnly: true, domain: '.slonum.ru', ...cookieOptions });
  }
}

/**
 * Удаление jwt токенов из куки
 */
export function removeTokenCookies(res: Response): void {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
}
