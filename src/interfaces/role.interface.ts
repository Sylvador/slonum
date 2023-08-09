import { RoleEnum } from '../enums/role.enum';

export interface IRole {
  id: number;
  value: RoleEnum;
  description: string;
}
