import { IProfile } from './base-profile.interface';
import { IParentProfile } from './parent.interface';

export interface IChildProfile extends IProfile {
  login: string;
  password: string;
  birthDate?: Date | string;
  parentProfileId?: number;
  parentProfile: IParentProfile;
}
