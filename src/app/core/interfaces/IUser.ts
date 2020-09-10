export interface IUser {
  username: string;
  password: string;
  email?: string;
  phone?: string;
  sessionToken: string;
  ACL: any;
}
