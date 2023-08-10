# @slonum/common
## Types
- [AuthData](https://github.com/Sylvador/slonum#authdata)
- [AuthMetaData](https://github.com/Sylvador/slonum#authmetadata)
- [JwtPayload](https://github.com/Sylvador/slonum#jwtpayload)
- [JwtPayloadRT](https://github.com/Sylvador/slonum#jwtpayloadrt)
- [Name](https://github.com/Sylvador/slonum#name)
- [Tokens](https://github.com/Sylvador/slonum#tokens)
## Interfaces
- [IProfile](https://github.com/Sylvador/slonum#iprofile)
- [IChildProfile](https://github.com/Sylvador/slonum#ichildprofile)
- [IParentProfile](https://github.com/Sylvador/slonum#iparentprofile)
- [IRefreshToken](https://github.com/Sylvador/slonum#irefreshtoken)
- [IRequest](https://github.com/Sylvador/slonum#irequest)
- [IRole](https://github.com/Sylvador/slonum#irole)
- [IRpcException](https://github.com/Sylvador/slonum#irpcexception)
- [IUser](https://github.com/Sylvador/slonum#iuser)
## Enums
- [RegistrationSource](https://github.com/Sylvador/slonum#registrationsource)
- [RoleEnum](https://github.com/Sylvador/slonum#roleenum)
## Utils
- ValidationException
- [splitFullName](https://github.com/Sylvador/slonum#splitfullname)
- [joinFullName](https://github.com/Sylvador/slonum#joinfullname)
- [setTokenCookies](https://github.com/Sylvador/slonum#settokencookies)
- [removeTokenCookies](https://github.com/Sylvador/slonum#removetokencookies)
## Passport Strategies
- [AtStrategy](https://github.com/Sylvador/slonum#atstrategy)
## Guards
- AtGuard
- RolesGuard
## Pipes
- ValidationPipe
## Middlewares
- LoggerMiddleware
## Message Services
### BaseMessageService
Базовый класс сервисов сообщений
### Auth
- AuthModule
- [AuthService](https://github.com/Sylvador/slonum/edit/main/README.md#authservice)
- AuthMessagePatterns
### UserInfo
- ProfileModule
- [ProfileService](https://github.com/Sylvador/slonum/edit/main/README.md#profileservice)
- ProfileMessagePatterns
## Loggers
- LoggerModule
- CustomLoggerService
- [RpcExceptionLogger](https://github.com/Sylvador/slonum/edit/main/README.md#rpcexceptionlogger)
## ExceptionFilters
- [HttpExceptionFilter](https://github.com/Sylvador/slonum/edit/main/README.md#httpexceptionlogger)
- [RpcExceptionFilter](https://github.com/Sylvador/slonum/edit/main/README.md#rpcexceptionfilter)
## Decorators
- [Auth](https://github.com/Sylvador/slonum/edit/main/README.md#auth)
- [GetCurrentUser](https://github.com/Sylvador/slonum/edit/main/README.md#getcurrentuser)
- [MetaData](https://github.com/Sylvador/slonum/edit/main/README.md#metadata)
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
AtStrategy импортируется при регистрации CommonModule
```typescript
@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(MODULE_OPTIONS_TOKEN) { ACCESS_SECRET }: CommonModuleOptions) {
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

  validate(payload: JwtPayload): Omit<JwtPayload, 'passwordHash'> {
    return {
      id: payload.id,
      email: payload.email,
      roles: payload.roles,
      vkId: payload.vkId,
      emailConfirmed: payload.emailConfirmed,
      googleId: payload.googleId,
    };
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
## Filters
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
### GetCurrentUser
\<PayloadType\> — Если передать тип токена, то IDE при указании параметра `data` покажет его ключи<br>
Параметр `data` — ключ [JwtPayload](https://github.com/Sylvador/slonum/edit/main/README.md#jwtpayload) | [JwtPayloadRT](https://github.com/Sylvador/slonum/edit/main/README.md#jwtpayloadrt)<br>
Возвращает декодированный токен, если не передан `data`<br>
Возвращает значение `data` из токена, если передан
```typescript
export const GetCurrentUser = createParamDecorator(
  <PayloadType extends JwtPayloadRT | JwtPayload>(
    data: keyof PayloadType | undefined,
    context: ExecutionContext,
  ): PayloadType | PayloadType[keyof PayloadType] => {
    const user = context.switchToHttp().getRequest().user as PayloadType;
    if (!data) return user;
    return user[data];
  },
);
```
### Metadata
Возвращает [AuthMetaData](https://github.com/Sylvador/slonum/edit/main/README.md#authmetadata)
```typescript
export const MetaData = createParamDecorator((data: unknown, ctx: ExecutionContext): AuthMetaData => {
  const req = ctx.switchToHttp().getRequest();
  return { ipAddress: req.ip, userAgent: req.headers['user-agent'] };
});
```
