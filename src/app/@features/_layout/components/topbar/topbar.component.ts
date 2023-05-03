import { switchMap } from 'rxjs/operators';
import { IBus } from '@shared/state-bus/IBus';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthBaseState, AuthStateActions } from '@features/auth';
import { Select } from '@ngxs/store';
import { BehaviorSubject, map, Observable, Subscription, tap } from 'rxjs';
import { LayoutService } from '../../core/layout.service';
import { UserTypes } from '@shared/constants';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  toolbarButtonMarginClass = 'ms-1 ms-lg-3';
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px';
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';
  toolbarButtonIconSizeClass = 'svg-icon-1';
  headerLeft: string = 'menu';
  isAdmin = false;
  balance$: Observable<string>;
  userEmail: BehaviorSubject<string> = new BehaviorSubject('');
  loadingPromoterWallet$: Observable<boolean>;
  loadingWorkspaceWallet$: Observable<boolean>;
  promoterId: string;
  workspaceId: string;
  constructor(private layout: LayoutService, private stateBus: IBus) {}
  ngOnInit(): void {
    this.headerLeft = this.layout.getProp('header.left') as string;
    const authSup = this.stateBus.getState(AuthBaseState.getUser).subscribe((user) => {
      // if (user.userType === UserTypes.Advertiser) {
      //   this.isAdvertiser = true;
      // } else if (user.userType === UserTypes.Promoter) {
      //   this.isPromoter = true;
      // } else if (user.userType === UserTypes.Admin) {
      //   this.isAdmin = true;
      //   this.userEmail.next(user.email!);
      // }
    });
    this.subscription.push(authSup);
  }
  ngOnDestroy(): void {
    this.subscription.forEach((x) => x.unsubscribe());
  }
}
