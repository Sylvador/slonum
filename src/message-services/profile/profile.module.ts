import { ProfileService } from './profile.service';
import { Module } from '@nestjs/common';
import { ProfileMessageService } from './profile-message.service';
import { RmqModule } from '../../modules';

@Module({
  imports: [RmqModule.register({ service: 'USER_INFO_SERVICE', queue: 'user-info' })],
  providers: [ProfileService, ProfileMessageService],
  exports: [ProfileService, ProfileMessageService],
})
export class ProfileModule {}
