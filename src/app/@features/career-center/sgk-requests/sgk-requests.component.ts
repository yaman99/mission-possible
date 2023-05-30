import { Component, OnInit } from '@angular/core';
import { CareerCenterHttpService } from '../services/career-center-http.service';
import { SgkRequestModel } from '../models/sgkRequestModel';
import { RequestManagementHttpService } from '@shared/services/request-management.service';
import { BehaviorSubject } from 'rxjs';
import { InternshipApplicationModel } from '@shared/models/internshipApplicationModel';
import { GetAllInternshipApplicationFormResponse } from '@shared/models/responses/getAllInternshipApplicationFormResponse';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sgk-requests',
  templateUrl: './sgk-requests.component.html',
  styleUrls: ['./sgk-requests.component.scss'],
})
export class SgkRequestsComponent implements OnInit {
  requestsData = new BehaviorSubject<InternshipApplicationModel[]>([]);
  baseUrl = environment.ApiUrl;
  constructor(private requestManagementServ: RequestManagementHttpService) {}
  ngOnInit() {
    this.getAllSgkRequest();
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
  getAllSgkRequest() {
    this.requestManagementServ.getAllRequests('application' , 'approved').subscribe({
      next: (res: GetAllInternshipApplicationFormResponse) => {
        this.requestsData.next(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
