import { Component, OnInit } from '@angular/core';
import { StudentPaths } from '@features/student/_commonPaths/studentPaths.constants';

@Component({
  selector: 'app-internshi-appplications-list',
  templateUrl: './internshi-appplications-list.component.html',
  styleUrls: ['./internshi-appplications-list.component.scss']
})
export class InternshiAppplicationsListComponent  {
  paths = {
    addApplication : StudentPaths.addApplicationComponents
  }

  constructor() { }



}
