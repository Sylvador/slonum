import { IUser } from './user.interface';

export interface IRefreshToken {
  id: number;
  userId: number;
  user: IUser;
  userAgent: string;
  ipAddress: string;
}