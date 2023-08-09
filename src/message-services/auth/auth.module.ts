import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthMessageService } from './auth-message.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env['RMQ_URL'] || 'amqp://localhost:5672'],
          queue: 'auth',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [AuthService, AuthMessageService],
  exports: [AuthService, AuthMessageService],
})
export class AuthModule {}
