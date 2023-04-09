import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PromoterConversionsState } from '@features/promoter/promoter-conversions/store/states/promoterConversionsState.state';
import { Select } from '@ngxs/store';
import { PromoterConversionsInsights } from '@features/promoter/promoter-conversions/models/promoterConversionsInsights.model';

@Component({
  selector: 'app-promoter-dashboard-insights',
  templateUrl: './promoter-dashboard-insights.component.html',
  styleUrls: ['./promoter-dashboard-insights.component.scss'],
})
export class PromoterDashboardInsightsComponent {
  @Select(PromoterConversionsState.insights) insights$: Observable<PromoterConversionsInsights>;
  @Select(PromoterConversionsState.isLoading) isLoading$: Observable<boolean>;
  constructor() {}
}
