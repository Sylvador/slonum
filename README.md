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
## [Types](https://github.com/Sylvador/slonum#types-1)
- [AuthData](https://github.com/Sylvador/slonum#authdata)
- [AuthMetaData](https://github.com/Sylvador/slonum#authmetadata)
- [JwtPayload](https://github.com/Sylvador/slonum#jwtpayload)
- [JwtPayloadRT](https://github.com/Sylvador/slonum#jwtpayloadrt)
- [Name](https://github.com/Sylvador/slonum#name)
- [Tokens](https://github.com/Sylvador/slonum#tokens)
## [Interfaces](https://github.com/Sylvador/slonum#interfaces-1)
- [IProfile](https://github.com/Sylvador/slonum#iprofile)
- [IChildProfile](https://github.com/Sylvador/slonum#ichildprofile)
- [IParentProfile](https://github.com/Sylvador/slonum#iparentprofile)
- [IRefreshToken](https://github.com/Sylvador/slonum#irefreshtoken)
- [IRequest](https://github.com/Sylvador/slonum#irequest)
- [IRole](https://github.com/Sylvador/slonum#irole)
- [IRpcException](https://github.com/Sylvador/slonum#irpcexception)
- [IUser](https://github.com/Sylvador/slonum#iuser)
## [Enums](https://github.com/Sylvador/slonum#enums-1)
- [RegistrationSource](https://github.com/Sylvador/slonum#registrationsource)
- [RoleEnum](https://github.com/Sylvador/slonum#roleenum)
## [Utils](https://github.com/Sylvador/slonum#utils-1)
- ValidationException
- [splitFullName](https://github.com/Sylvador/slonum#splitfullname)
- [joinFullName](https://github.com/Sylvador/slonum#joinfullname)
- [setTokenCookies](https://github.com/Sylvador/slonum#settokencookies)
- [removeTokenCookies](https://github.com/Sylvador/slonum#removetokencookies)
## [Passport Strategies](https://github.com/Sylvador/slonum#strategies)
- [AtStrategy](https://github.com/Sylvador/slonum#atstrategy)
## Guards
- AtGuard
- RolesGuard
## Pipes
- ValidationPipe
## [Middlewares](https://github.com/Sylvador/slonum#middlewares-1)
- [LoggerMiddleware](https://github.com/Sylvador/slonum#loggermiddleware)
## [Message Services](https://github.com/Sylvador/slonum#message-services-1)
### [BaseMessageService](https://github.com/Sylvador/slonum#basemessageservice-1)
Базовый класс сервисов сообщений
### Auth
- AuthModule
- [AuthService](https://github.com/Sylvador/slonum#authservice-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F-%D0%B4%D0%BE%D0%BB%D0%B6%D0%B5%D0%BD-%D1%82%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE-%D0%B2-user-info-%D0%B8%D0%B7-%D0%B4%D1%80%D1%83%D0%B3%D0%B8%D1%85-%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%BE%D0%B2-%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%D1%8B-%D1%81%D1%8E%D0%B4%D0%B0-%D0%BF%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%B0%D1%82%D1%8C-%D0%BD%D0%B5-%D0%B4%D0%BE%D0%BB%D0%B6%D0%BD%D1%8B)
- AuthMessagePatterns
### UserInfo
- ProfileModule
- [ProfileService](https://github.com/Sylvador/slonum#profileservice-%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81-%D0%B4%D0%BB%D1%8F-%D0%BE%D0%B1%D1%80%D0%B0%D1%89%D0%B5%D0%BD%D0%B8%D1%8F-%D0%BA-slonum-user-info)
- ProfileMessagePatterns
## [Loggers](https://github.com/Sylvador/slonum#loggers-1)
- LoggerModule
- CustomLoggerService
- [RpcExceptionLogger](https://github.com/Sylvador/slonum#rpcexceptionlogger)
## [Exception Filters](https://github.com/Sylvador/slonum#exception-filters-1)
- [HttpExceptionFilter](https://github.com/Sylvador/slonum#httpexceptionlogger)
- [RpcExceptionFilter](https://github.com/Sylvador/slonum#rpcexceptionfilter)
## [Decorators](https://github.com/Sylvador/slonum#decorators-1)
- [Auth](https://github.com/Sylvador/slonum#auth-1)
- [GetJwtPayload](https://github.com/Sylvador/slonum#getjwtpayload)
- [GetRtJwtPayload](https://github.com/Sylvador/slonum#getrtjwtpayload)
- [MetaData](https://github.com/Sylvador/slonum#metadata)
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
async getProfileById(id: number): Promise<IProfile> {
    return this.profileMessageService.send({ id }, ProfileMessagePatterns.GET_PROFILE_BY_ID);
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
@UseFilters(new RpcExceptionFilterLogger())
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
    @GetCurrentUser('id') parentId: number,
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
  async getCurrentUserById(@GetCurrentUser<JwtPayload>('id') id: number): Promise<IProfile> {
    return this.profileService.getCurrentUserById(id);
  }
```
### GetJwtPayload
Параметр `data` — ключ [JwtPayload](https://github.com/Sylvador/slonum#jwtpayload)<br>
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
Параметр `data` — ключ [JwtPayloadRT](https://github.com/Sylvador/slonum#jwtpayloadrt)<br>
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
Возвращает [AuthMetaData](https://github.com/Sylvador/slonum#authmetadata)
```typescript
export const MetaData = createParamDecorator((data: unknown, ctx: ExecutionContext): AuthMetaData => {
  const req = ctx.switchToHttp().getRequest();
  return { ipAddress: req.ip, userAgent: req.headers['user-agent'] };
});
```
