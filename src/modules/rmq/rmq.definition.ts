import { ConfigurableModuleBuilder } from '@nestjs/common';
import { RmqOptions } from '@nestjs/microservices';

export interface SimplifiedRmqOptions {
  /**
   * Название токена сервиса для DI
   */
  service: string;
  /**
   * Название очереди
   */
  queue: string;

  extras?: RmqOptions;
}

export const {
  ConfigurableModuleClass: ConfigurableRmqModuleClass,
  MODULE_OPTIONS_TOKEN: RMQ_OPTIONS_TOKENS,
  OPTIONS_TYPE: RMQ_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<SimplifiedRmqOptions>().build();
