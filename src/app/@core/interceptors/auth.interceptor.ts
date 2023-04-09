import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { map, tap, switchMap } from 'rxjs/operators';
import { AuthBaseState } from '@features//auth/states/auth.state';
import { AuthStateActions } from '@features//auth/actions/auth.action';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store, private jwtHelper: JwtHelperService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.store.selectOnce(AuthBaseState.getToken).pipe(
      switchMap((token: string | null) => {
        if (
          this.jwtHelper.isTokenExpired() &&
          !request.url.includes('Identity') &&
          token
        ) {
          this.store.dispatch(new AuthStateActions.RefreshToken());
        }
        return next.handle(this.InjectToken(request, token!));
      })
    );
  }

  private InjectToken(request: HttpRequest<any>, token: string) {
      const contentType =
      request.detectContentTypeHeader() === null
        ? "'Content-Type' : 'application/json'"
        : request.detectContentTypeHeader()!;

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        contentType,
        Accept: 'application/json, text/plain, /',
      },
    });
  }

  // private IgnoredUrls(requestUrl: string): boolean {
  //   const Urls = ['refresh-token', 'sign-out', 'sign-in', 'customer-signup'];
  //   let value = false;
  //   Urls.forEach(url => {
  //     value = requestUrl.includes(url);
  //   });
  //   return value;
  // }
}
