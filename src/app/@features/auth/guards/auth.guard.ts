import { AuthStateActions } from '@features//auth/actions/auth.action';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { map, switchMap } from 'rxjs/operators';
import { AuthBaseState } from '../states/auth.state';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private jwtHelper: JwtHelperService) {}

  canActivate() {
    return this.store.selectOnce(AuthBaseState.getToken).pipe(
      switchMap((token) => {
        if (!token) {
          this.store.dispatch(new AuthStateActions.LogoutRedirect());
          return of(false);
        }

        if (!this.jwtHelper.isTokenExpired()) {
          return of(true);
        } else {
          return this.store.dispatch(new AuthStateActions.RefreshToken()).pipe(
            map(() => true)
          );
        }
      })
    );
  }
}
