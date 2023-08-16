export enum AuthMessagePatterns {
  REGISTER = 'register',
  REGISTER_CHILD = 'register_child',
  LOGIN = 'login',
  LOGOUT = 'logout',
  DELETE = 'DELETE',
  REFRESH_TOKENS = 'refreshToken',
  SEND_CONFIRM_EMAIL = 'sendConfirmEmail',
  FIND_ONE_BY_EMAIL = 'findOneByEmail',
  PROVIDE_ROLE = 'provide-role',
  DEPRIVE_ROLE = 'deprive-role',
  UPDATE_USER = 'updateUser',
  UPDATE_EMAIL = 'updateEmail',
  UPDATE_PASSWORD = 'updatePassword',
  FIND_ONE_BY_ID = 'findOneById',
  OAUTH_LOGIN = 'OAUTH_LOGIN',
}
