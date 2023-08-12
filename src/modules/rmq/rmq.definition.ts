import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface RmqOptions {
  service: string;
  queue: string;
}

export const {
  ConfigurableModuleClass: ConfigurableRmqModuleClass,
  MODULE_OPTIONS_TOKEN: RMQ_OPTIONS_TOKENS,
  OPTIONS_TYPE: RMQ_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<RmqOptions>().build();
