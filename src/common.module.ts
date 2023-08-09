import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { AtStrategy } from './strategies';
import { ConfigurableModuleClass } from './common.module-definition';
import { AuthModule } from './message-services/auth/auth.module';
import { ProfileModule } from './message-services/profile/profile.module';

@Module({
  providers: [CommonService, AtStrategy, ProfileModule, AuthModule],
  exports: [CommonService, AtStrategy, AuthModule, ProfileModule, AuthModule],
})
export class CommonModule extends ConfigurableModuleClass {}