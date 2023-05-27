import { Component, OnInit } from '@angular/core';
import { CareerCenterHttpService } from '../services/career-center-http.service';
import { SgkRequestModel } from '../models/sgkRequestModel';

@Component({
  selector: 'app-sgk-requests',
  templateUrl: './sgk-requests.component.html',
  styleUrls: ['./sgk-requests.component.scss'],
})
export class SgkRequestsComponent implements OnInit{
  sgkRequests : SgkRequestModel[];
  constructor(private crServ : CareerCenterHttpService) {}
  ngOnInit() {
    this.getAllSgkRequest()
  }

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
  getAllSgkRequest(){
    this.crServ.getAllInternshipApplicationRequests().subscribe({
      next: (data ) => {
        this.sgkRequests = data.sgkRequestData;
      },
      error: (err) => {
        console.log(err);
      }

    })
  }
}
