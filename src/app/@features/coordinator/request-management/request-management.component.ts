import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-management',
  templateUrl: './request-management.component.html',
  styleUrls: ['./request-management.component.scss']
})
export class RequestManagementComponent  {
  fakeStudent=[{
    id:'1',
    applicationForm:'www.uskudar.edu.tr',
    transcriptStatus:'not uploaded',
    status:'pending',
  },
  {
    id:'2',
    applicationForm:'www.uskudar.edu.tr',
    transcriptStatus:'not uploaded',
    status:'pending',
  }
  ];

  constructor() { }



}
