import { AuthMetaData } from './auth-metadata.type';

export type AuthData = {
  login?: string;
  email?: string;
  password?: string;
  vkId?: number;
  googleId?: string;
  metadata?: AuthMetaData;
};
