import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayload } from '../types';
import { MODULE_OPTIONS_TOKEN } from '../common.module-definition';
import { CommonModuleOptions } from '../interfaces/common-module-options.interface';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(MODULE_OPTIONS_TOKEN) { ACCESS_SECRET }: CommonModuleOptions) {
    console.log('ACCESS_SECRET', process.env[ACCESS_SECRET]);
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), AtStrategy.extractJwtFromCookies]),
      ignoreExpiration: false,
      secretOrKey: process.env[ACCESS_SECRET] || 'ACCESS_SECRET',
    });
  }

  private static extractJwtFromCookies(req: Request): string | null {
    if (req.cookies && req.cookies.access_token) {
      return req.cookies.access_token;
    }
    return null;
  }

  validate(payload: JwtPayload): Omit<JwtPayload, 'passwordHash'> {
    return {
      id: payload.id,
      email: payload.email,
      roles: payload.roles,
      vkId: payload.vkId,
      emailConfirmed: payload.emailConfirmed,
      googleId: payload.googleId,
    };
  }
}
