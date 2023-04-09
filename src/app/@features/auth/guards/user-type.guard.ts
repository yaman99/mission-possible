// import { AuthService } from 'libs/auth/src/lib/index';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthBaseState } from '../states/auth.state';
import { AuthStateActions } from '../actions/auth.action';

@Injectable({
  providedIn: 'root'
})
export class UserTypeGuard implements CanActivate {
  /**
   *
   */
  constructor(private router: Router, private store: Store) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userType = this.store.selectSnapshot(AuthBaseState.getUserType);
    const GuardUserType = route.data['guardUserType'] as Array<string>;
    const checker = GuardUserType.find(x=> x === userType)
    if (checker) {
      return true;
    }
    this.store.dispatch(new AuthStateActions.LoginRedirect());
    return false;
  }
}
