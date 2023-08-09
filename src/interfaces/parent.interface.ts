import { IProfile } from './base-profile.interface';
import { IChildProfile } from './child.interface';

export interface IParentProfile extends IProfile {
  email: string;
  children?: IChildProfile[];
}
