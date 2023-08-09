import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadRT } from '../types/jwt-payload-rt.type';
import { JwtPayload } from '../types';
/**
 * @template PayloadType Если передать тип токена, то ide при указании параметра `data` покажет его ключи
 * @param data ключ `JwtPayload | JwtPayloadRT`
 * @returns Возвращает декодированный токен, если не передан `data`
 * @returns Возвращает значение `data` из токена, если передан
 */
export const GetCurrentUser = createParamDecorator(
  <PayloadType extends JwtPayloadRT | JwtPayload>(
    data: keyof PayloadType | undefined,
    context: ExecutionContext,
  ): PayloadType | PayloadType[keyof PayloadType] => {
    const user = context.switchToHttp().getRequest().user as PayloadType;
    if (!data) return user;
    return user[data];
  },
);
