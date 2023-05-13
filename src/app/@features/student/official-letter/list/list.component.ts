import { Component, OnInit } from '@angular/core';
import { OfficialLetterPathActions, OfficialLetterPaths } from '@features/student/_commonPaths/officialLetterPaths.constants';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent  {
  currentDate = new Date();
  paths={
    list :OfficialLetterPaths.listComponents,
    addOfficialLetter : OfficialLetterPaths.addOfficialLetterComponents
  }

  constructor() { }


}
