import { Injectable } from '@nestjs/common';
import { RegisterResponseDto, LoginDto } from '../../dto';
import { RoleEnum } from '../../enums';
import { IUser } from '../../interfaces';
import { AuthData, AuthMetaData, Tokens } from '../../types';
import { AuthMessagePatterns } from './auth-message.patterns';
import { AuthMessageService } from './auth-message.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { IProvideUserRole } from './interfaces/provide-role.interface';
import { IUpdateEmail } from './interfaces/update-email.interface';
import { IUpdateUser } from './interfaces/update-user.interface';

@Injectable()
export class AuthService {
  constructor(protected readonly authMessageService: AuthMessageService) {}

  async register(authData: AuthData, metaData: AuthMetaData, role: RoleEnum): Promise<RegisterResponseDto> {
    return this.authMessageService.send({ authData, metaData, role }, AuthMessagePatterns.REGISTER);
  }

  async login(loginDto: LoginDto): Promise<Tokens> {
    return this.authMessageService.send(loginDto, AuthMessagePatterns.LOGIN);
  }

  async logout(refreshToken: string): Promise<number> {
    return this.authMessageService.send({ refreshToken }, AuthMessagePatterns.LOGOUT);
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<Tokens> {
    return this.authMessageService.send(refreshTokenDto, AuthMessagePatterns.REFRESH_TOKENS);
  }

  async registerChild(childAuthData: AuthData): Promise<IUser> {
    return this.authMessageService.send(childAuthData, AuthMessagePatterns.REGISTER_CHILD);
  }

  async updateUser(updateUserDto: IUpdateUser): Promise<IUser> {
    return this.authMessageService.send(updateUserDto, AuthMessagePatterns.UPDATE_USER);
  }

  async deleteUser(toDeleteId: number): Promise<number> {
    return this.authMessageService.send({ id: toDeleteId }, AuthMessagePatterns.DELETE);
  }

  async updateEmail(updateEmailDto: IUpdateEmail): Promise<IUser> {
    return this.authMessageService.send(updateEmailDto, AuthMessagePatterns.UPDATE_EMAIL);
  }

  async updatePassword(userId: number, password: string): Promise<IUser> {
    const sendData = {
      id: userId,
      password,
    };
    return this.authMessageService.send(sendData, AuthMessagePatterns.UPDATE_PASSWORD);
  }

  async sendConfirmationEmail(user: IUser): Promise<boolean> {
    return this.authMessageService.send(user, AuthMessagePatterns.SEND_CONFIRM_EMAIL);
  }

  async provideUserRole(provideRoleDto: IProvideUserRole): Promise<IUser> {
    return this.authMessageService.send(provideRoleDto, AuthMessagePatterns.PROVIDE_ROLE);
  }

  async findOneById(id: number): Promise<IUser | null> {
    return this.authMessageService.send({ id }, AuthMessagePatterns.FIND_ONE_BY_ID);
  }
}
