import {Component} from '@angular/core';

@Component({
  selector: 'app-help-drawer',
  templateUrl: './help-drawer.component.html',
})
export class HelpDrawerComponent  {
  appThemeName: string = "";
  appPurchaseUrl: string = "";

  constructor() {
  }


}
