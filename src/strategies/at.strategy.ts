import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayload } from '../types';
import { JWT_OPTIONS_TOKEN, JwtModuleOptions } from '../modules/jwt-module/jwt.definition';

/**
 * Стратегия валидации access токена
 */
@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(JWT_OPTIONS_TOKEN) { ACCESS_SECRET }: JwtModuleOptions) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), AtStrategy.extractJwtFromCookies]),
      ignoreExpiration: false,
      secretOrKey: ACCESS_SECRET || 'ACCESS_SECRET',
    });
  }

  private static extractJwtFromCookies(req: Request): string | null {
    if (req.cookies && req.cookies.access_token) {
      return req.cookies.access_token;
    }
    return null;
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
