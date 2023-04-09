import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PromoterConversionsState } from '@features/promoter/promoter-conversions/store/states/promoterConversionsState.state';
import { Select } from '@ngxs/store';
import { PromoterConversion } from '@features/promoter/promoter-conversions/models/promoterConversions';
import { PagedResultBase } from '@shared/models/pagination';
import { IBus } from '@shared/state-bus/IBus';
import { PromoterState } from '@features/promoter/_store/states/promoter.state';
import { GetPromoterConversionsRequest } from '@features/promoter/promoter-conversions/models/Requests/getPromoterConversionsRequest';
import { PromoterConversionsStateActions } from '@features/promoter/promoter-conversions/store/actions/promoterConversionsState.actions';

@Component({
  selector: 'app-promoter-dashboard-conversions-list',
  templateUrl: './promoter-dashboard-conversions-list.component.html',
  styleUrls: ['./promoter-dashboard-conversions-list.component.scss'],
})
export class PromoterDashboardConversionsListComponent implements OnInit, OnDestroy {
  @Select(PromoterConversionsState.conversions) conversions$: Observable<PromoterConversion[]>;
  @Select(PromoterConversionsState.pagination) pagination$: Observable<PagedResultBase>;
  @Select(PromoterConversionsState.isLoading) isLoading$: Observable<boolean>;
  subscriptions: Subscription[] = [];
  constructor(private stateBus: IBus) {}

  ngOnInit(): void {
    this.getPage(1);
  }
  getPage(page: number) {
    const sub = this.stateBus.getState(PromoterState.promoterId).subscribe((id) => {
      if (id) {
        let model: GetPromoterConversionsRequest = {
          promoterId: id,
          pagination: {
            page: page,
            result: 10,
            orderBy: 'CreatedDate',
          },
        };
        this.stateBus.excuteAction(new PromoterConversionsStateActions.Get(model));
      }
    });
    this.subscriptions.push(sub);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
