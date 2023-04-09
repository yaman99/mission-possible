import { switchMap } from 'rxjs/operators';
import { IBus } from '@shared/state-bus/IBus';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthBaseState, AuthStateActions } from '@features/auth';
import { WorkspaceWalletState } from '@features/workspace/settings/store/states/workspaceWallet.state';
import { WorkspaceState } from '@features/workspace/_store/states/workspace.state';
import { Select } from '@ngxs/store';
import { BehaviorSubject, map, Observable, Subscription, tap } from 'rxjs';
import { LayoutService } from '../../core/layout.service';
import { UserTypes } from '@shared/constants';
import { PromoterState } from '@features/promoter/_store/states/promoter.state';
import { Promoter } from '@features/promoter/_models/promoter.model';
import { PromoterWalletState } from '@features/promoter/wallet/stateStore/state/promoterWallet.state';
import { PromoterWalletStateActions } from '@features/promoter/wallet/stateStore/actions/promoterWallet.actions';
import { WorkspaceWalletStateActions } from '@features/workspace/settings/store/actions/workspaceWallet.actions';

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
  @Select(WorkspaceState.getLogo) logo$: Observable<string>;
  @Select(PromoterState.promoter) promoter$: Observable<Promoter>;
  isPromoter = false;
  isAdvertiser = false;
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
      if (user.userType === UserTypes.Advertiser) {
        this.isAdvertiser = true;
        this.workspaceId = this.stateBus.getSnapshot(WorkspaceState.workspace).id;
        this.stateBus.excuteAction(new WorkspaceWalletStateActions.GetBlanace(this.workspaceId));
        this.balance$ = this.stateBus.getState(WorkspaceWalletState.Balance);
        this.loadingWorkspaceWallet$ = this.stateBus.getState(WorkspaceWalletState.isLoading);
      } else if (user.userType === UserTypes.Promoter) {
        this.isPromoter = true;
        this.promoterId = this.stateBus.getSnapshot(PromoterState.promoterId);
        this.stateBus.excuteAction(new PromoterWalletStateActions.GetProfit(this.promoterId));
        this.balance$ = this.stateBus.getState(PromoterWalletState.Profit);
        this.loadingPromoterWallet$ = this.stateBus.getState(PromoterWalletState.isLoading);
      } else if (user.userType === UserTypes.Admin) {
        this.isAdmin = true;
        this.userEmail.next(user.email!);
      }
    });
    this.subscription.push(authSup);
  }
  ngOnDestroy(): void {
    this.subscription.forEach((x) => x.unsubscribe());
  }
}
