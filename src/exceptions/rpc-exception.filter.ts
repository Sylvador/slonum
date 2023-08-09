import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import { IRpcException } from '../interfaces/rpc-exception.interface';
import { CustomLoggerService } from '../logger/custom-logger.service';
const logger = new CustomLoggerService();

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    let err = exception.getError() as IRpcException;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (err.error) err = err.error;
    logger.error(err);
    if (!err.response) {
      return response.status(500).json({ statusCode: 500, error: 'Internal server error', message: 'Internal server error' });
    }

    response.status(err.response?.statusCode ?? err.status).json(err.response ?? err);
  }
}
