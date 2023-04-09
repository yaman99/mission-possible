import { AuthModel } from './auth.model';
export class User {
  id: string | null;
  email: string | null;
  isActive?: string | null;
  userType: string | null;
  phone?: string | null;
  isDeleted?: boolean | null;
  punishments?: string[] | null;
}
