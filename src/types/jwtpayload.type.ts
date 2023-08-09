import { IRole } from '../interfaces/role.interface';

export type JwtPayload = {
  id: number;
  email: string;
  vkId: number;
  emailConfirmed: boolean;
  googleId: string;
  roles: IRole[];
};
