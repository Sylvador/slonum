import { AuthMetaData } from '../../../types';


export class RefreshTokenDto {
  readonly refreshToken: string;

  readonly metaData: AuthMetaData;
}
