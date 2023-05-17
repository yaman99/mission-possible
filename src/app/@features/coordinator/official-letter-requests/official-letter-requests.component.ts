import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-official-letter-requests',
  templateUrl: './official-letter-requests.component.html',
  styleUrls: ['./official-letter-requests.component.scss']
})
export class OfficialLetterRequestsComponent  {
  fakeStudent=[{
    id:'1',
    companyName:'Getir',
    internshipType:'Complusory 1',
    status:'pending',
  },
  {
    id:'2',
    companyName:'Trendyol',
    internshipType:'voluntary',
    status:'pending',
  }
  ];


  constructor() { }


}
