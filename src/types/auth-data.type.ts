import { AuthMetaData } from './auth-metadata.type';

/**
 * Данные для создания User в slonum-auth
 */
export type AuthData = {
  login?: string;
  email?: string;
  password?: string;
  vkId?: number;
  googleId?: string;
  metadata?: AuthMetaData;
};
