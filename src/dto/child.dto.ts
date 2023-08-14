import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsDate } from 'class-validator';

/**
 * Данные для регистрации ребёнка
 */
export class ChildDto {
  @ApiProperty({ description: 'Фамилия, имя ребенка', example: 'Иванова Анна', required: false })
  @IsOptional()
  @IsString()
  childFullName?: string;

  @ApiProperty({ description: 'Дата рождения ребенка', example: '2000-01-01T00:00:00.000Z', required: false })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  birthDate?: Date;

  @ApiProperty({ description: 'Город', example: 'Москва', required: false })
  @IsString()
  @IsOptional()
  city?: string;
}
