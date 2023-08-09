import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  override handleRequest(err: any, user: IUser, info: any, context: ExecutionContext, status: any) {
    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException('Invalid JWT');
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
