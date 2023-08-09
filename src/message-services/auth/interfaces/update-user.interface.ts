export interface IUpdateUser {
  id: number;
  login?: string;
  email?: string;
  newPassword?: string;
  oldPassword?: string;
}
