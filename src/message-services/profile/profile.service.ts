import { Injectable } from '@nestjs/common';
import { ProfileMessageService } from './profile-message.service';
import { RegisterDto, RegisterResponseDto, UpdateProfileDto } from '../../dto';
import { IProfile } from '../../interfaces';
import { ProfileMessagePatterns } from './profile-message.patterns';
import { JwtPayload } from '../../types';
@Injectable()
export class ProfileService {
  constructor(private profileMessageService: ProfileMessageService) {}
  
  async register(createUserInfoDto: RegisterDto): Promise<RegisterResponseDto> {
    return this.profileMessageService.send(createUserInfoDto, ProfileMessagePatterns.REGISTER);
  }

  async getProfileById(id: number): Promise<IProfile> {
    return this.profileMessageService.send({ id }, ProfileMessagePatterns.GET_PROFILE_BY_ID);
  }

  async getProfilesByIds(ids: number[]): Promise<IProfile[]> {
    return this.profileMessageService.send({ ids }, ProfileMessagePatterns.GET_PROFILES_BY_IDS);
  }

  async updateProfile(user: JwtPayload, udpateProfileDto: UpdateProfileDto): Promise<IProfile> {
    return this.profileMessageService.send({ user, udpateProfileDto }, ProfileMessagePatterns.UPDATE_PROFILE);
  }

  async checkParentByChild(parentId, childId): Promise<boolean> {
    return this.profileMessageService.send({ parentId, childId }, ProfileMessagePatterns.CHECK_PARENT_BY_CHILD);
  }
}
