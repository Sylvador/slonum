import { RegistrationSource } from '../enums/registration-source.enum';
/**
 * Базовый профиль, от которого наследуются профили родителя и ребёнка
 *
 * Следует использовать, когда неизвестно точно чей профиль будет в объекте или когда это просто неважно.
 */
export interface IProfile {
  id: number;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  city?: string;
  avatarLink?: string;
  registrationSource: RegistrationSource;
}
