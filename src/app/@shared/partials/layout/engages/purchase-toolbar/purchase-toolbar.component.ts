import {Component} from '@angular/core';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-purchase-toolbar',
  templateUrl: './purchase-toolbar.component.html',
})
export class PurchaseToolbarComponent  {
  appPurchaseUrl: string = "";

  constructor() {
  }


}
