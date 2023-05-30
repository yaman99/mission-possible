import { Component, OnInit } from '@angular/core';
import { CareerCenterHttpService } from '../services/career-center-http.service';
import { SgkRequestModel } from '../models/sgkRequestModel';
import { RequestManagementHttpService } from '@shared/services/request-management.service';
import { BehaviorSubject } from 'rxjs';
import { InternshipApplicationModel } from '@shared/models/internshipApplicationModel';
import { GetAllInternshipApplicationFormResponse } from '@shared/models/responses/getAllInternshipApplicationFormResponse';
import { environment } from 'src/environments/environment';
import { NoticeService } from '@core/notification/notice.service';

@Component({
  selector: 'app-sgk-requests',
  templateUrl: './sgk-requests.component.html',
  styleUrls: ['./sgk-requests.component.scss'],
})
export class SgkRequestsComponent implements OnInit {
  requestsData = new BehaviorSubject<InternshipApplicationModel[]>([]);
  baseUrl = environment.ApiUrl;
  sgkFile:File
  formData = new FormData();
  constructor(private requestManagementServ: RequestManagementHttpService , private notification: NoticeService) {}
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
  onFileSelected(e: any, requestId: string) {
    this.sgkFile = e.target.files[0];
    this.formData.append('id', requestId);
    this.formData.append('file', this.sgkFile);
    this.formData.append('type', 'sgk');
    this.requestManagementServ.uploadOfficialLetter(this.formData).subscribe({
      next: () => {
        this.notification.successNotice('Official Letter Uploaded Successfully');
        this.getAllSgkRequest();
      },
    });
  }
}
