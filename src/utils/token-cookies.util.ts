import { Response } from 'express';
import { Tokens } from '../types';

/**
 * Установка jwt токенов в куки
 */
export function setTokenCookies(res: Response, tokens: Tokens): void {
  res.cookie('access_token', tokens.accessToken, { secure: true, domain: '.slonum.ru' });
  res.cookie('refresh_token', tokens.refreshToken, { secure: true, domain: '.slonum.ru' });
}

/**
 * Удаление jwt токенов из куки
 */
export function removeTokenCookies(res: Response): void {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
}
