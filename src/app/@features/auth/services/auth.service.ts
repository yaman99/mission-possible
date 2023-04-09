import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { TokenClaimsModel } from '../models/tokenClaims.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IBus } from '@shared/state-bus/IBus';


@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(

    public jwtHelper: JwtHelperService,
    public stateBus:IBus

  ) {

  }
  getTokenClaims(token:string) : TokenClaimsModel {
    return this.jwtHelper.decodeToken(token);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
