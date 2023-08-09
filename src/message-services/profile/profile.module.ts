import { ProfileService } from './profile.service';
import { Module } from '@nestjs/common';
import { ProfileMessageService } from './profile-message.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_INFO_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env['RMQ_URL'] || 'amqp://localhost:5672'],
          queue: 'user-info',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [ProfileService, ProfileMessageService],
  exports: [ProfileService, ProfileMessageService],
})
export class ProfileModule {}
