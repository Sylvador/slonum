import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { CustomLoggerService } from '../../logger';

/**
 * Сервис для получения готовых настроек для подключения сервиса к rabbitmq
 */
@Injectable()
export class RmqService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * @param queue Название очереди
   * @returns Опции подключения к rabbitmq
   */
  getRmqOptions(queue: string) {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get('RMQ_URL') || 'amqp://localhost:5672'],
        queue,
        queueOptions: {
          durable: false,
        },
      },
      logger: new CustomLoggerService(),
    };
  }
}
