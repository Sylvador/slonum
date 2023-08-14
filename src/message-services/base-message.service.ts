import { InternalServerErrorException } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { TimeoutError, catchError, lastValueFrom, throwError, timeout } from 'rxjs';
import { ValidationException } from '../exceptions/validation.exception';

/**
 * Базовый абстрактный класс сервиса отправки сообщений в rabbit со встроенной обработкой ошибок
 */
export abstract class BaseMessageService {
  protected readonly MAX_TIMEOUT: number = 5000;

  constructor(protected proxyClient: ClientProxy) {}
  async send(message: object, pattern: any): Promise<any> {
    try {
      return await lastValueFrom(
        this.proxyClient.send(pattern, message).pipe(
          timeout(this.MAX_TIMEOUT),
          catchError((err) =>
            throwError(() => {
              if (err instanceof TimeoutError) return err;
              return new RpcException(err);
            }),
          ),
        ),
      );
    } catch (error: any) {
      if (error.message === 'Internal server error') throw new InternalServerErrorException();
      if (error.error?.name == 'ValidationException') {
        let response = error.error.response;
        if (!response) {
          response = error.error.message;
        } else if (!response.length) {
          response = [response];
        }
        throw new ValidationException(response);
      }
      throw error;
    }
  }
}
