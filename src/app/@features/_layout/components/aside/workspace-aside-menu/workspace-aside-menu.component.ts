import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WorkspaceSettingsPaths } from '@features/workspace/paths';
import { CampaignPaths, ItemPaths } from '@shared/paths';

@Component({
  selector: 'app-workspace-aside-menu',
  templateUrl: './workspace-aside-menu.component.html',
  styleUrls: ['./workspace-aside-menu.component.scss'],
})
export class WorkspaceAsideMenuComponent  {
  appAngularVersion: string = environment.appVersion;
  appPreviewChangelogUrl: string = "";
  paths = {
    ItemsListPath: ItemPaths.ItemsListComponents,
    // AddItemPath: ItemPaths.AddItemComponents,
    CampaignsListPath: CampaignPaths.CampaignsListComponents,
    AddCampaignPath: CampaignPaths.AddCampaignComponents,
    paymentSettings:WorkspaceSettingsPaths.paymentComponents,
    workspaceSettings:WorkspaceSettingsPaths.workspaceComponents,
    accountSettings:WorkspaceSettingsPaths.accountComponents,
    integrationSettings:WorkspaceSettingsPaths.integrationComponents,
  }

  constructor() {}


}
