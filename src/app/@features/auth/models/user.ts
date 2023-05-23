import { AuthModel } from './auth.model';
export class User {
  id: string | null;
  email: string | null;
  userType: string | null;
  isDeleted?: boolean | null;
  fullName:string| null
}
