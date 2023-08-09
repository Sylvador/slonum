import { RoleEnum } from '../../../enums';

export interface IRemoveUserRole {
  user_id: number;
  role: RoleEnum;
}
