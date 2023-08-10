import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CustomLoggerService } from './custom-logger.service';
import { throwError } from 'rxjs';
const logger = new CustomLoggerService();

/**
 * Логгер для ошибок в rabbit контроллерах
 * 
 * `@UseFilters(new RpcExceptionLogger())`
 * 
 * Просто выводит логи ошибок
 */
@Catch(RpcException)
export class RpcExceptionLogger implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost) {
    logger.error(exception);
    return throwError(() => exception.getError());
  }
}
