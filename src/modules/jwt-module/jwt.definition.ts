import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface JwtModuleOptions {
  ACCESS_SECRET?: string;
}

export const { ConfigurableModuleClass: ConfigurableJwtModuleClass, MODULE_OPTIONS_TOKEN: JWT_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<JwtModuleOptions>().build();
