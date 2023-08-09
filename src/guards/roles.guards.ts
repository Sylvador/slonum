import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles.decorator';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.getRequiredRoles(context);
    if (!requiredRoles.length) {
      return true;
    }
    const user: IUser = context.switchToHttp().getRequest().user;
    if (this.hasRole(user, requiredRoles)) {
      return true;
    } else {
      throw new ForbiddenException('Нет доступа');
    }
  }

  private getRequiredRoles(context: ExecutionContext): string[] {
    return this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
  }

  private hasRole(user: IUser, requiredRoles: string[]): boolean {
    return user.roles.some((role) => requiredRoles.includes(role.value));
  }
}
