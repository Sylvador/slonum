import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsEmail, IsDate } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'john_doe', description: 'Логин пользователя', required: false })
  @IsOptional()
  @IsString()
  login?: string;

  @ApiProperty({ example: 'old_password', description: 'Старый пароль пользователя', required: false })
  @IsOptional()
  @IsString()
  oldPassword?: string;

  @ApiProperty({ example: 'new_password', description: 'Новый пароль пользователя', required: false })
  @IsOptional()
  @IsString()
  newPassword?: string;

  @ApiProperty({ example: 'new_password', description: 'Подтверждение нового пароля', required: false })
  @IsOptional()
  @IsString()
  passwordConfirm?: string;

  @ApiProperty({ example: 'john@example.com', description: 'Адрес электронной почты пользователя', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;
}

export class ProfileDto {
  @ApiProperty({ example: 'Иван Иванов', description: 'Полное имя пользователя', required: false })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({ example: 'Нью-Йорк', description: 'Город проживания пользователя', required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ example: '1990-01-01', description: 'Дата рождения пользователя', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthDate?: Date;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', description: 'URL аватара пользователя', required: false })
  @IsOptional()
  @IsString()
  avatarUrl?: string;
}

export class UpdateProfileDto {
  @ApiProperty({ type: ProfileDto, description: 'Данные профиля', required: false })
  @IsOptional()
  profileDto?: ProfileDto;

  @ApiProperty({ type: AuthDto, description: 'Данные авторизации', required: false })
  @IsOptional()
  authDto?: AuthDto;

  @ApiProperty({ example: 1, description: 'ID ребенка. Нужно передать, если родитель редактирует профиль ребёнка', required: false })
  @IsOptional()
  childId?: number;
}
