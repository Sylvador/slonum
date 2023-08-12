import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../types';
/**
 * @param data ключ `JwtPayload`
 * @returns Возвращает декодированный токен, если не передан `data`
 * @returns Возвращает значение `data` из токена, если передан
 */
export const GetJwtPayload = createParamDecorator(
  (data: keyof JwtPayload | undefined, context: ExecutionContext): JwtPayload | JwtPayload[keyof JwtPayload] => {
    const user = context.switchToHttp().getRequest().user;
    if (!data) return user;
    return user[data];
  },
);
