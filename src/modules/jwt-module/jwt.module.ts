import { Module } from '@nestjs/common';
import { AtStrategy } from '../../strategies';
import { ConfigurableJwtModuleClass } from './jwt.definition';

/**
 * Обязательно нужно передать `ACCESS_SECRET` в опциях в методе register
 */
@Module({
  providers: [AtStrategy],
  exports: [AtStrategy],
})
export class JwtModule extends ConfigurableJwtModuleClass {}
