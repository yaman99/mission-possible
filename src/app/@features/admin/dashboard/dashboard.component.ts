import { BehaviorSubject, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AdminDashboardInsights } from './models/adminDashboardInsights';
import { AdminDashboardHttpService } from './Services/admin-dashboard-http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  insightsData: BehaviorSubject<AdminDashboardInsights> = new BehaviorSubject<AdminDashboardInsights>({
    totalAdvertisers: 0,
    totalPromoters: 0,
    pendingCommissionsCount: 0,
    pendingCommissionsAmount: 0,
    approvedCommissionsCount: 0,
    approvedCommissionsAmount: 0,
    rejectedCommissionsCount: 0,
    rejectedCommissionsAmount: 0,
    paidCommissionsAmount: 0,
    totalBalance: 0,
    totalProfit: 0
  });
  // insights: BehaviorSubject<any> = new BehaviorSubject([]);
  subscriptions: Subscription[] = [];
  constructor(private dashboardService: AdminDashboardHttpService) {}


  ngOnInit(): void {
    this.getInsights();
  }

  getInsights() {
    const sub = this.dashboardService.getDashboardInsights().subscribe((data) => {
      this.insightsData.next({
        totalAdvertisers: data.totalAdvertisers,
        totalPromoters: data.totalPromoters,
        pendingCommissionsCount: data.pendingCommissionsCount,
        pendingCommissionsAmount: data.pendingCommissionsAmount,
        approvedCommissionsCount: data.approvedCommissionsCount,
        approvedCommissionsAmount: data.approvedCommissionsAmount,
        rejectedCommissionsCount: data.rejectedCommissionsCount,
        rejectedCommissionsAmount: data.rejectedCommissionsAmount,
        paidCommissionsAmount: data.paidCommissionsAmount,
        totalBalance: data.totalBalance,
        totalProfit: data.totalProfit
      });
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
