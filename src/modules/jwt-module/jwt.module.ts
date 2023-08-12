import { Module } from '@nestjs/common';
import { AtStrategy } from '../../strategies';
import { ConfigurableJwtModuleClass } from './jwt.definition';

@Module({
  providers: [AtStrategy],
  exports: [AtStrategy],
})
export class JwtModule extends ConfigurableJwtModuleClass {}
