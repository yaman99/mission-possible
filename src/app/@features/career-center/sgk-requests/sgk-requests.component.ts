import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sgk-requests',
  templateUrl: './sgk-requests.component.html',
  styleUrls: ['./sgk-requests.component.scss'],
})
export class SgkRequestsComponent {
  constructor() {}

  fakeStudent = [
    {
      id: '1',
      companyName: 'Getir',
      internshipType: 'Complusory 1',
      status: 'pending',
    },
    {
      id: '2',
      companyName: 'Trendyol',
      internshipType: 'voluntary',
      status: 'pending',
    },
  ];
}
