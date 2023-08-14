import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { AuthMessageService } from './auth-message.service';
import { RmqModule } from '../../modules';

/**
 * Сервис slonum-auth. На данный момент только для user-info
 */
@Module({
  imports: [RmqModule.register({ service: 'AUTH_SERVICE', queue: 'auth' })],
  providers: [AuthService, AuthMessageService],
  exports: [AuthService, AuthMessageService],
})
export class AuthModule {}
