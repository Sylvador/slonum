# Краткое руководство
## Ключевые компоненты
- ### Модуль авторизации
Подключение:
```typescript
import globals, { ACCESS_SECRET } from './config/global.config';
import { JwtModule } from '@slonum/common';

@Module({
  imports: [JwtModule.register({ ACCESS_SECRET: globals()[ACCESS_SECRET]})],
})
export class AppModule {}
```
Использование:
```typescript
@Auth()
@Get('me')
getCurrentUser() {
  // user-info
}

@Auth('ADMIN')
@Get('secret')
getSecretData() {
  // секретные данные
}
```
- ### Модуль Rmq. Подключение и регистрация сервисов
Подключение:
```typescript
// app.module.ts

// Сначала импортируем в AppModule.
// Это необходимо, чтобы сработала инъекция ConfigService в экспортируемый RmqService
// Делать для этого ничего не нужно, инъекция произойдет сама
import { RmqModule } from '@slonum/common';

@Module({
  imports: [RmqModule],
})
export class AppModule {}

// main.ts

const rmqService: RmqService = app.get(RmqService);
app.connectMicroservice(rmqService.getRmqOptions('название очереди'));
await app.startAllMicroservices();
```
Регистрация сервиса:
```typescript
import { RmqModule } from '@slonum/common';

@Module({
  imports: [RmqModule.register({ service: 'NAME_SERVICE', queue: 'queue' })],
})
export class AppModule {}
```
В этом случае также экспортируется RmqService для подключения очереди в main.ts
- ### Куки авторизации
```typescript
import { Response } from 'express';
import { setTokenCookies } from '@slonum/common';

@Post('register-participant')
async registerParticipant(@Res() res: Response, @Body() registerParticipantDto: RegisterParticipantDto): ResponseDto {
  const responseDto: ResponseDto = await this.participantService.registerParticipant(registerParticipantDto);
  setTokenCookies(res, response.tokens);
  return response; 
}
```
# Содержимое библиотеки
## [Types](#types-1)
- [AuthData](#authdata)
- [AuthMetaData](#authmetadata)
- [JwtPayload](#jwtpayload)
- [JwtPayloadRT](#jwtpayloadrt)
- [Name](#name)
- [Tokens](#tokens)
## [Interfaces](#interfaces-1)
- [IProfile](#iprofile)
- [IChildProfile](#ichildprofile)
- [IParentProfile](#iparentprofile)
- [IRefreshToken](#irefreshtoken)
- [IRequest](#irequest)
- [IRole](#irole)
- [IRpcException](#irpcexception)
- [IUser](#iuser)
## [Dtos](#dtos-1)
- [RegisterDto](#registerdto)
- [RegisterResponseDto](#registerresponsedto)
- [ChildDto](#childdto)
- [LoginDto](#logindto)
- [UpdateProfileDto](#updateprofiledto)
## [Enums](#enums-1)
- [RegistrationSource](#registrationsource)
- [RoleEnum](#roleenum)
## [Utils](#utils-1)
- ValidationException
- [splitFullName](#splitfullname)
- [joinFullName](#joinfullname)
- [setTokenCookies](#settokencookies)
- [removeTokenCookies](#removetokencookies)
## [Passport Strategies](#strategies)
- [AtStrategy](#atstrategy)
## Guards
- AtGuard
- RolesGuard
## Pipes
- ValidationPipe
## [Middlewares](#middlewares-1)
- [LoggerMiddleware](#loggermiddleware)
## [Message Services](#message-services-1)
### [BaseMessageService](#basemessageservice-1)
Базовый класс сервисов сообщений
### Auth
- AuthModule
- [AuthService](#authservice-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F-%D0%B4%D0%BE%D0%BB%D0%B6%D0%B5%D0%BD-%D1%82%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE-%D0%B2-user-info-%D0%B8%D0%B7-%D0%B4%D1%80%D1%83%D0%B3%D0%B8%D1%85-%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%BE%D0%B2-%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%D1%8B-%D1%81%D1%8E%D0%B4%D0%B0-%D0%BF%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%B0%D1%82%D1%8C-%D0%BD%D0%B5-%D0%B4%D0%BE%D0%BB%D0%B6%D0%BD%D1%8B)
- AuthMessagePatterns
### UserInfo
- ProfileModule
- [ProfileService](#profileservice-%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81-%D0%B4%D0%BB%D1%8F-%D0%BE%D0%B1%D1%80%D0%B0%D1%89%D0%B5%D0%BD%D0%B8%D1%8F-%D0%BA-slonum-user-info)
- ProfileMessagePatterns
## [Loggers](#loggers-1)
- LoggerModule
- CustomLoggerService
- [RpcExceptionLogger](#rpcexceptionlogger)
## [Exception Filters](#exception-filters-1)
- [HttpExceptionFilter](#httpexceptionfilter)
- [RpcExceptionFilter](#rpcexceptionfilter)
## [Decorators](#decorators-1)
- [Auth](#auth-1)
- [GetJwtPayload](#getjwtpayload)
- [GetRtJwtPayload](#getrtjwtpayload)
- [MetaData](#metadata)
## Types
### AuthData
Данные сущности User в сервисе slonum-auth
```typescript
export type AuthData = {
  login?: string;
  email?: string;
  password?: string;
  vkId?: number;
  googleId?: string;
  metadata?: AuthMetaData;
};
```
### AuthMetaData
```typescript
export type AuthMetaData = {
  ipAddress?: string;
  userAgent?: string;
};
```
### JwtPayload
Данные access_token
```typescript
import { IRole } from '../interfaces/role.interface';

export type JwtPayload = {
  id: number;
  email: string;
  vkId: number;
  emailConfirmed: boolean;
  googleId: string;
  roles: IRole[];
};
```
### JwtPayloadRT
Данные refresh_token
```typescript
export type JwtPayloadRT = {
  id: number;
  userId: number;
  userAgent: string;
  ipAddress: string;
}
```
### Name
```typescript
export type Name = {
  firstName: string;
  lastName?: string;
};
```
### Tokens
```typescript
export type Tokens = {
  accessToken: string;
  refreshToken: string;
};
```
## Interfaces
### IProfile
Базовый интерфейс профиля.
От него наследуются интерфейсы профилей родителя и ребёнка.
Его поля содержаться в обоих наследуемых интерфейсах
```typescript
export interface IProfile {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  city?: string;
  avatarLink?: string;
  registrationSource: RegistrationSource;
}
```
### IChildProfile
```typescript
export interface IChildProfile extends IProfile {
  login: string;
  password: string;
  birthDate?: Date | string;
  parentProfileId?: number;
  parentProfile: IParentProfile;
}
```
### IParentProfile
```typescript
export interface IParentProfile extends IProfile {
  email: string;
  children?: IChildProfile[];
}
```
### IRefreshToken
```typescript
export interface IRefreshToken {
  id: number;
  userId: number;
  user: IUser;
  userAgent: string;
  ipAddress: string;
}
```
### IRequest
```typescript
export interface IRequest {
  err?: any;
  user: JwtPayload;
  info: any;
  context: any;
  status: any;
}
```
### IRole
```typescript
export interface IRole {
  id: number;
  value: RoleEnum;
  description: string;
}
```
### IRpcException
В таком виде могут приходить исключения из сервисов при обращении к ним через rabbit.
```typescript
export interface IRpcException {
  response: { statusCode: number; message: string; error: string };
  name: string;
  message: string;
  status: number;
  error?: IRpcException;
}
```
### IUser
Интерфейс сущности User в slonum-auth
```typescript
export interface IUser {
  id: number;
  login?: string;
  email?: string;
  vkId?: number;
  roles?: IRole[];
  emailConfirmed: boolean;
  googleId?: string;
  passwordHash?: string;
  refreshTokens?: IRefreshToken[];
}
```
## Dtos
### RegisterDto
```typescript
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

  @ApiProperty({ type: ChildDto, description: 'Данные ребёнка', required: false })
  @IsOptional()
  childDto?: ChildDto;

  metaData: AuthMetaData;
}
```
### RegisterResponseDto
```typescript
export class RegisterResponseDto {
  @ApiProperty({ description: 'id пользователя', example: 1, type: 'number ' })
  userId?: number;

  @ApiProperty({ description: 'Токены пользователя', example: { accessToken: 'accessToken', refreshToken: 'refreshToken' } })
  tokens: Tokens;

  @ApiProperty({ description: 'Данные для входа в аккаунт ребёнка', type: LoginDto, required: false })
  childLoginDto?: LoginDto;
}
```
### ChildDto
```typescript
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
```
### LoginDto
```typescript
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
```
### UpdateProfileDto
```typescript
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
```
## Enums
### RegistrationSourceEnum
```typescript
export enum RegistrationSource {
  MAIN = 'MAIN',
  BLOG = 'BLOG',
  DRAWING_COMPETITION = 'DRAWING_COMPETITION',
  ENGLISH_LANG = 'ENGLISH_LANG',
  FRACTION = 'FRACTION',
  LK = 'LK',
  OLYMPIAD = 'OLYMPIAD',
  VOCABULARY_WORDS = 'VOCABULARY_WORDS',
}
```
### RoleEnum
```typescript
export enum RoleEnum {
  ADMIN = 'ADMIN',
  PARENT = 'PARENT',
  CHILD = 'CHILD',
}
```
## Utils
### splitFullName
```typescript
export function splitFullName(fullName: string): Name {
  const [firstName, lastName] = fullName.split(' ');
  return { firstName, lastName };
}
```
### joinFullName
```typescript
export function joinFullName(name: Name): string {
  return `${name.firstName} ${name.lastName}`;
}
```
### setTokenCookies
```typescript
export function setTokenCookies(res: Response, tokens: Tokens): void {
  res.cookie('access_token', tokens.accessToken, { httpOnly: true, sameSite: 'strict', secure: true });
  res.cookie('refresh_token', tokens.refreshToken);
}
```
### removeTokenCookies
```typescript
export function removeTokenCookies(res: Response): void {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
}
```
## Strategies
### AtStrategy
AtStrategy импортируется при регистрации JwtModule
```typescript
@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(JWT_OPTIONS_TOKEN) { ACCESS_SECRET }: JwtModuleOptions) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), AtStrategy.extractJwtFromCookies]),
      ignoreExpiration: false,
      secretOrKey: ACCESS_SECRET || 'ACCESS_SECRET',
    });
  }

  private static extractJwtFromCookies(req: Request): string | null {
    if (req.cookies && req.cookies.access_token) {
      return req.cookies.access_token;
    }
    return null;
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
```
## Middlewares
### LoggerMiddleware
Применение:
```typescript
@Module({})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
```
## Message Services
### BaseMessageService
От него наследуются остальные сервисы сообщений
### AuthService. Использоваться должен ТОЛЬКО в user-info. Из других сервисов запросы сюда поступать не должны
Регистрация.
```typescript
async register(authData: AuthData, metaData: AuthMetaData, role: RoleEnum): Promise<RegisterResponseDto> {
    return this.authMessageService.send({ authData, metaData, role }, AuthMessagePatterns.REGISTER);
  }
```
Обновление User
```typescript
async updateUser(updateUserDto: IUpdateUser): Promise<IUser> {
    return this.authMessageService.send(updateUserDto, AuthMessagePatterns.UPDATE_USER);
  }
```
Удаление User
```typescript
async deleteUser(toDeleteId: number): Promise<number> {
    return this.authMessageService.send({ id: toDeleteId }, AuthMessagePatterns.DELETE);
  }
```
Подтвердить email(Неизвестно работает ли этот эндпоинт)
```typescript
async sendConfirmationEmail(user: IUser): Promise<boolean> {
    return this.authMessageService.send(user, AuthMessagePatterns.SEND_CONFIRM_EMAIL);
  }
```
Выдать роль.
Единственный эндпоинт, который, можно использовать с других сервисов, но, опять же, я не знаю работает ли он и зачем он у нас есть, так как роли у нас выдаются по http.
```typescript
async provideUserRole(provideRoleDto: IProvideUserRole): Promise<IUser> {
    return this.authMessageService.send(provideRoleDto, AuthMessagePatterns.PROVIDE_ROLE);
  }
```
Поиск User по id
```typescript
async findOneById(id: number): Promise<IUser | null> {
    return this.authMessageService.send({ id }, AuthMessagePatterns.FIND_ONE_BY_ID);
  }
```
### ProfileService. Сервис для обращения к slonum-user-info
Регистрация. Создаёт профиль и User в auth.
Можно регистрировать и родителя отдельно, и родителя с ребёнком. Если передан childFullName, значит регистрация происходит не через главную страницу, а через страницу мероприятия, следовательно также необходимо передать с какого мероприятия происходит регистрация
```typescript
async register(createUserInfoDto: RegisterDto): Promise<RegisterResponseDto> {
    return this.profileMessageService.send(createUserInfoDto, ProfileMessagePatterns.REGISTER);
  }
```
Получение профиля по id
```typescript
async getProfileById(id: number): Promise<IProfile> {
    return this.profileMessageService.send({ id }, ProfileMessagePatterns.GET_PROFILE_BY_ID);
  }
```
Получение нескольких профилей по массиву id
```typescript
async getProfilesByIds(ids: number[]): Promise<IProfile[]> {
    return this.profileMessageService.send({ ids }, ProfileMessagePatterns.GET_PROFILES_BY_IDS);
  }
```
Обновление данных профиля и User.<br>
При обращении через rabbit схема запроса должна выглядеть следующим образом:
```typescript
{
  "user": { ...JwtPayload },
  "updateProfileDto": { ...здесь_обычная_схема }
}
```
```typescript
async updateProfile(user: JwtPayload, udpateProfileDto: UpdateProfileDto): Promise<IProfile> {
    return this.profileMessageService.send({ user, udpateProfileDto }, ProfileMessagePatterns.UPDATE_PROFILE);
  }
```
Проверяет принадлежит ли ребёнок родителю.<br>
```typescript
async checkParentByChild(parentId, childId): Promise<boolean> {
    return this.profileMessageService.send({ parentId, childId }, ProfileMessagePatterns.CHECK_PARENT_BY_CHILD);
  }
```
Импортирование:
```typescript
import { ProfileModule } from '@slonum/common';

@Module({
  imports: [ProfileModule],
})
export class ParticipantModule {}
```
Применение:
```typescript
import { ProfileService } from '@slonum/common';
import { RegisterDto } from '@slonum/common';

@Injectable()
export class ParticipantService {
  constructor(
    private readonly profileService: ProfileService, // Зарегистрированный сервис
  ) {}

  async registerParticipant(registerDto: RegisterDto, ...rest) {
    const registerResponseDto: RegisterResponseDto = await this.profileService.register(registerDto);
    // Ваш код
  }
}
```
## Loggers
### RpcExceptionLogger
Логгер для ошибок в rabbit контроллерах<br>
Глобальное применение
```typescript
// main.ts
app.useGlobalFilters(new RpcExceptionLogger());
```
Применение к контроллеру
```typescript
@Controller()
@UseFilters(new RpcExceptionLogger())
export class ProfileRabbitController
```
Просто выводит логи ошибок
```typescript
@Catch(RpcException)
export class RpcExceptionLogger implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost) {
    logger.error(exception);
    return throwError(() => exception.getError());
  }
}
```
## Exception Filters
### HttpExceptionFilter
Выводит лог в консоль и формирует ответ с сервера<br>
```typescript
// main.ts
app.useGlobalFilters(new HttpExceptionFilter());
```
```typescript
const logger = new CustomLoggerService();

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const res: any = { ...exception };

    logger.warn(res.response?.message ?? res.message, 'Exception');

    response.status(status).json(res.response);
  }
}
```
### RpcExceptionFilter
Глобальное применение
```typescript
// main.ts
app.useGlobalFilters(new RpcExceptionFilter());
```
Применение к контроллеру
```typescript
@Controller()
@UseFilters(new RpcExceptionFilter())
export class ProfileRabbitController
```
```typescript
@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    let err = exception.getError() as IRpcException;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (err.error) err = err.error;
    logger.error(err);
    if (!err.response) {
      return response.status(500).json({ statusCode: 500, error: 'Internal server error', message: 'Internal server error' });
    }

    response.status(err.response?.statusCode ?? err.status).json(err.response ?? err);
  }
}
```
## Decorators
### Auth
Содержит в себе все необходимые декораторы для настройки доступа к эндпоинту<br>
Параметр `roles` - Роли, требуемые для доступа к эндпоинту. Опционально
```typescript
export function Auth(...roles: string[]) {
  return applyDecorators(SetMetadata(ROLES_KEY, roles), UseGuards(AtGuard, RolesGuard), ApiBearerAuth('jwt'));
}
```
Примеры использования:
```typescript
@ApiOperation({ summary: 'Добавление ребёнка', description: 'Логин для ребёнка генерируется автоматически' })
  @Post('add-child')
  @ApiBody({ type: ChildDto })
  @ApiCreatedResponse({ type: LoginDto, description: 'Логин и пароль ребёнка' })
  @Auth('PARENT')
  async addChild(
    @GetJwtPayload('id') parentId: number,
    @Body() childDto: ChildDto,
    @MetaData() metaData: AuthMetaData,
  ): Promise<LoginDto> {
    return this.profileService.addChild(parentId, childDto, metaData);
  }
```
```typescript
@ApiOperation({ summary: 'Получение данных о текущем пользователе', description: 'Данные получаются по id пользователя из токена' })
  @ApiResponse({ type: Profile })
  @Auth()
  @Get()
  async getCurrentUserById(@GetJwtPayload('id') id: number): Promise<IProfile> {
    return this.profileService.getCurrentUserById(id);
  }
```
### GetJwtPayload
Параметр `data` — ключ [JwtPayload](#jwtpayload)<br>
Возвращает декодированный токен, если не передан `data`<br>
Возвращает значение `data` из токена, если передан
```typescript
export const GetJwtPayload = createParamDecorator(
  (data: keyof JwtPayload | undefined, context: ExecutionContext): JwtPayload | JwtPayload[keyof JwtPayload] => {
    const user = context.switchToHttp().getRequest().user;
    if (!data) return user;
    return user[data];
  },
);
```
### GetRtJwtPayload
Параметр `data` — ключ [JwtPayloadRT](#jwtpayloadrt)<br>
Возвращает декодированный токен, если не передан `data`<br>
Возвращает значение `data` из токена, если передан
```typescript
export const GetRtJwtPayload = createParamDecorator(
  (data: keyof JwtPayloadRT | undefined, context: ExecutionContext): JwtPayloadRT | JwtPayloadRT[keyof JwtPayloadRT] => {
    const user = context.switchToHttp().getRequest().user;
    if (!data) return user;
    return user[data];
  },
);
```
### Metadata
Возвращает [AuthMetaData](#authmetadata)
```typescript
export const MetaData = createParamDecorator((data: unknown, ctx: ExecutionContext): AuthMetaData => {
  const req = ctx.switchToHttp().getRequest();
  return { ipAddress: req.ip, userAgent: req.headers['user-agent'] };
});
```
