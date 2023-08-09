import { RegistrationSource } from '../enums/registration-source.enum';

export interface IProfile {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  city?: string;
  avatarLink?: string;
  registrationSource: RegistrationSource;
}
