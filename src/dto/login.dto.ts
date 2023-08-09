import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { AuthMetaData } from '../types';

export class LoginDto {
  @ApiProperty({ description: 'Логин пользователя', example: 'parent@example.com' })
  @IsString()
  login: string;

  @ApiProperty({ description: 'Пароль пользователя', example: 'password123' })
  @IsString()
  password: string;

  authMetaData?: AuthMetaData;

  @ApiResponseProperty({ type: Number, example: 1 })
  childId?: number;
}
