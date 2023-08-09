import { JwtPayload } from '../types';

export interface IRequest {
  err?: any;
  user: JwtPayload;
  info: any;
  context: any;
  status: any;
}