import { IRefreshToken } from './refresh-token.inteface';
import { IRole } from './role.interface';

/**
 * Интерфейс сущности `User` в slonum-auth
 */
export interface IUser {
  id: number;
  login?: string;
  email?: string;
  vkId?: number;
  roles?: IRole[];
  emailConfirmed: boolean;
  googleId?: string;
  passwordHash?: string;
  refreshTokens?: IRefreshToken[];
}
