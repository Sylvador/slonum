import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthMessagePatterns } from './auth-message.patterns';
import { BaseMessageService } from '../../utils';

@Injectable()
export class AuthMessageService extends BaseMessageService {
  constructor(@Inject('AUTH_SERVICE') readonly authClient: ClientProxy) {
    super(authClient);
  }

  override async send(message: object, pattern: AuthMessagePatterns): Promise<any> {
    return super.send(message, pattern);
  }
}
