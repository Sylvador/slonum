import { InternalServerErrorException } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { TimeoutError, catchError, lastValueFrom, throwError, timeout } from 'rxjs';
import { ValidationException } from '../exceptions/validation.exception';

export abstract class BaseMessageService {
  protected readonly MAX_TIMEOUT: number = 5000;

  constructor(protected proxyClient: ClientProxy) {}
  async send(message: object, pattern: any): Promise<any> {
    let answer;
    try {
      answer = await lastValueFrom(
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
    // if (answer == null) {
    //   throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR); // переписать
    // }
    return answer;
  }
}
