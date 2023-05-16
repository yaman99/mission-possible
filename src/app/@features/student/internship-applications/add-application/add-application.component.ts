import { Component, } from '@angular/core';


@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.scss']
})
export class AddApplicationComponent  {
  compulsory1Checked: boolean = false;
  compulsory2Checked: boolean = false;
  voluntaryChecked: boolean = false;

  handleCheckboxChange(checkbox: string) {
    if (checkbox === 'compulsory1') {
      this.compulsory1Checked = true;
      this.compulsory2Checked = false;
      this.voluntaryChecked = false;

    }
    if (checkbox === 'compulsory2') {
      this.compulsory1Checked = false;
      this.compulsory2Checked = true;
      this.voluntaryChecked = false;
    }
    if (checkbox === 'voluntary') {
      this.compulsory1Checked = false;
      this.compulsory2Checked = false;
      this.voluntaryChecked = true;
    }
  }

}
