import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { ChildDto } from './child.dto';
import { MIN_PASSWORD_LENGTH } from '../config/globals';
import { RegistrationSource } from '../enums';
import { AuthMetaData } from '../types';

/**
 * @property `metaData` - должна быть прикреплена перед отправкой запроса. Можно воспользоваться декоратором `@Metadata`
 * @property `childDto` - передается для регистрации родителя вместе с ребёнком.
 * Если не передан, то пользователь будет зарегистрирован как родитель
 *
 * Самостоятельная регистрация ребёнка не предполагается
 */
export class RegisterDto {
  @ApiProperty({ description: 'Email родителя', example: 'parent@example.com', required: false })
  @IsEmail({}, { message: 'Неверно указан email' })
  @IsOptional()
  parentEmail?: string;

  @ApiProperty({ description: 'Пароль пользователя', example: 'password123' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(MIN_PASSWORD_LENGTH, undefined, { message: `Минимальная длина - ${MIN_PASSWORD_LENGTH}` })
  password: string;

  @ApiProperty({ description: 'Фамилия, имя родителя', example: 'Иванов Иван', required: false })
  @IsString()
  @IsOptional()
  parentFullName?: string;

  @ApiProperty({ description: 'Город', example: 'Москва', required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({
    description: 'Мероприятие, через которое происходит регистрация. По умолчанию будет главная страница',
    example: RegistrationSource.OLYMPIAD,
    required: false,
  })
  @IsEnum(RegistrationSource)
  @IsOptional()
  registrationSource?: RegistrationSource;

  /**
   * Передается для регистрации родителя вместе с ребёнком.
   * Если не передан, то пользователь будет зарегистрирован как родитель
   */
  @ApiProperty({ type: ChildDto, description: 'Данные ребёнка', required: false })
  @IsOptional()
  childDto?: ChildDto;

  metaData: AuthMetaData;
}
