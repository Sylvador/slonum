import { AuthMetaData } from '../types';

export interface OAuthLogin {
  id: string;
  provider: string;
  email: string;
  fullName: string;
  metaData: AuthMetaData;
}
