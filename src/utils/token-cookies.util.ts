import { Response } from 'express';
import { Tokens } from '../types';

export function setTokenCookies(res: Response, tokens: Tokens): void {
  res.cookie('access_token', tokens.accessToken, { httpOnly: true, sameSite: 'strict', secure: true });
  res.cookie('refresh_token', tokens.refreshToken);
}

export function removeTokenCookies(res: Response): void {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
}
