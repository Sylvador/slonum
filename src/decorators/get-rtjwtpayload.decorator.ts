import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadRT } from '../types/jwt-payload-rt.type';
/**
 * @param data ключ `JwtPayloadRT`
 * @returns Возвращает декодированный токен, если не передан `data`
 * @returns Возвращает значение `data` из токена, если передан
 */
export const GetRtJwtPayload = createParamDecorator(
  (data: keyof JwtPayloadRT | undefined, context: ExecutionContext): JwtPayloadRT | JwtPayloadRT[keyof JwtPayloadRT] => {
    const user = context.switchToHttp().getRequest().user;
    if (!data) return user;
    return user[data];
  },
);
