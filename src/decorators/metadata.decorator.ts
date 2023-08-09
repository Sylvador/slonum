import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AuthMetaData } from '../types/auth-metadata.type';
/**
 * @returns {AuthMetaData} Возвращает объект, содержащий ip и userAgent
 */
export const MetaData = createParamDecorator((data: unknown, ctx: ExecutionContext): AuthMetaData => {
  const req = ctx.switchToHttp().getRequest();
  return { ipAddress: req.ip, userAgent: req.headers['user-agent'] };
});
