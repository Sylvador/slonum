import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProfileMessagePatterns } from './profile-message.patterns';
import { BaseMessageService } from '../base-message.service';

@Injectable()
export class ProfileMessageService extends BaseMessageService {
  constructor(@Inject('USER_INFO_SERVICE') profileClient: ClientProxy) {
    super(profileClient);
  }

  override async send(message: object, pattern: ProfileMessagePatterns): Promise<any> {
    return super.send(message, pattern);
  }
}
