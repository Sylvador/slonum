import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RmqService } from './rmq.service';
import { ConfigurableRmqModuleClass, RMQ_OPTIONS_TYPE } from './rmq.definition';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

/**
 * Модуль для регистрации соединений с другими сервисами
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
  ],
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule extends ConfigurableRmqModuleClass {
  /**
   * Регистрирует соединение с другим сервисом
   */
  static register(options: typeof RMQ_OPTIONS_TYPE) {
    const providers: Provider[] = [
      {
        provide: options.service,
        useFactory: (configService: ConfigService) => {
          return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: [configService.get<string>('RMQ_URL') || 'amqp://localhost:5672'],
              queue: options.queue,
              queueOptions: {
                durable: false,
              },
            },
          });
        },
        inject: [ConfigService],
      },
    ];
    return {
      ...super.register(options),
      module: RmqModule,
      providers,
      exports: providers,
    };
  }
}
