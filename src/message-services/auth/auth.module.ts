import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { AuthMessageService } from './auth-message.service';
import { RmqModule } from '../../modules';

@Module({
  imports: [RmqModule.register({ service: 'AUTH_SERVICE', queue: 'auth' })],
  providers: [AuthService, AuthMessageService],
  exports: [AuthService, AuthMessageService],
})
export class AuthModule {}
