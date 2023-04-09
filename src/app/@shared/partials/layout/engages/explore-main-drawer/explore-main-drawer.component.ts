import {Component} from '@angular/core';

@Component({
  selector: 'app-explore-main-drawer',
  templateUrl: './explore-main-drawer.component.html',
})
export class ExploreMainDrawerComponent  {
  appThemeName: string = "";
  appPurchaseUrl: string = "";
  appPreviewUrl: string = "";
  appDemos = "";

  constructor() {
  }


}
