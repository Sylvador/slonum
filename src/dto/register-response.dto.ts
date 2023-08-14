import { ApiProperty } from '@nestjs/swagger';
import { LoginDto } from './login.dto';
import { Tokens } from '../types';

/**
 * @property `childLoginDto` - Данные для входа в аккаунт ребёнка возвращаются при регистрации родителя с ребёнком
 */
export class RegisterResponseDto {
  @ApiProperty({ description: 'id пользователя', example: 1, type: 'number ' })
  userId?: number;

  @ApiProperty({ description: 'Токены пользователя', example: { accessToken: 'accessToken', refreshToken: 'refreshToken' } })
  tokens: Tokens;

  @ApiProperty({ description: 'Данные для входа в аккаунт ребёнка', type: LoginDto, required: false })
  childLoginDto?: LoginDto;
}
