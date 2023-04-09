import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Conversion } from '@shared/features/conversion/models/conversion.model';
import { WorkspaceCampaignState } from '@features/workspace/workspace-campaign/store/states/campaign.state';
import { IBus } from '@shared/state-bus/IBus';
import { Select } from '@ngxs/store';
import { PagedResultBase } from '@shared/models/pagination';
import { ConversionState } from '@features/workspace/workspace-campaign/store/states/conversion.state';
import { GetCampaignConversionsRequest } from '@features/workspace/workspace-campaign/models/requests/getCampaignConversionsRequest';
import { ConversionStateActions } from '@features/workspace/workspace-campaign/store/actions/conversion.action';
import { ApproveConversionRequest } from '@features/workspace/workspace-campaign/models/requests/changeConversionStatusRequest';
import { ConversionStatus } from '@shared/constants';
import { WorkspaceState } from '@features/workspace/_store/states/workspace.state';
import { NoticeService } from '@core/notification/notice.service';
import { WorkspaceWalletState } from '@features/workspace/settings/store/states/workspaceWallet.state';

@Component({
  selector: 'app-workspace-campaign-conversions',
  templateUrl: './workspace-campaign-conversions.component.html',
  styleUrls: ['./workspace-campaign-conversions.component.scss'],
})
export class WorkspaceCampaignConversionsComponent implements OnInit {
  @Select(ConversionState.conversions) conversions$: Observable<Conversion[]>;
  @Select(ConversionState.pagination) pagination$: Observable<PagedResultBase>;
  @Select(ConversionState.Loading) isLoading$: Observable<boolean>;
  campaignId: string;
  workspaceId: string;
  balance: any;
  conversionStatus = ConversionStatus;
  constructor(private stateBus: IBus, private route: ActivatedRoute, private noticeService: NoticeService) {}

  ngOnInit(): void {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id')!;
    this.workspaceId = this.stateBus.getSnapshot(WorkspaceState.workspace).id;
    this.getPage(1);
  }
  getConversionStatus(status: number) {
    switch (status) {
      case ConversionStatus.approved:
        return 'CONVERSION.STATUS.APPROVED';
      case ConversionStatus.rejected:
        return 'CONVERSION.STATUS.REJECTED';
      case ConversionStatus.pendding:
        return 'CONVERSION.STATUS.PENDDING';
    }
  }
  getPage(page: number) {
    let model: GetCampaignConversionsRequest = {
      campaign: this.campaignId,
      pagination: {
        page: page,
        result: 10,
        orderBy: 'CreatedDate',
      },
    };
    this.stateBus.excuteAction(new ConversionStateActions.GetAll(model));
  }
  approve(conversionId: string, commissionAmount: number) {
    this.balance = this.stateBus.getSnapshot(WorkspaceWalletState.Balance);
    if (this.balance < commissionAmount) {
      this.noticeService.generalErrorNotice('GENERAL.ALERT.ERROR.NO_ENOUGH_BALANCE');
    } else {
      let model: ApproveConversionRequest = {
        conversionId: conversionId,
        workspaceId: this.workspaceId,
      };
      this.noticeService.askAlert('GENERAL.ALERT.MESSAGE.APPROVE_CONVERSION').then((result) => {
        if (result) {
          this.stateBus.excuteAction(new ConversionStateActions.Approve(model));
        }
      });
    }
  }
  reject(conversionId: string) {
    this.stateBus.excuteAction(new ConversionStateActions.Reject(conversionId));
  }

}
