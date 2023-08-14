/**
 * Содержимое декодированного рефреш токена
 */
export type JwtPayloadRT = {
  id: number;
  userId: number;
  userAgent: string;
  ipAddress: string;
};
