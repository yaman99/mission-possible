import { ILoadingHandler } from './../../../@shared/state-helpers/loading-handler/ILoadingHandler';
export class AuthStateModel implements ILoadingHandler {
  isLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  id: string | null;
  email: string | null;
  userType: string | null;
  fullName: string | null;
}
