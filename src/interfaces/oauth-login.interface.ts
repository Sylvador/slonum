import { AuthMetaData } from '../types';

export interface OAuthLogin {
  id: string;
  providerIdToken: ProviderIdToken;
  email: string;
  fullName: string;
  metaData: AuthMetaData;
}

export type ProviderIdToken = 'googleId' | 'vkId';
