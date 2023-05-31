import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UpdateApplicationStatusRequest } from '../../../@shared/models/requests/updateApplicationStatusRequest';
import { CoordinatorHttpService } from '../services/coordinator-http.service';
import { ApplicationRequestModel } from '../models/applicationRequestModel';
import { RequestManagementHttpService } from '@shared/services/request-management.service';
import { GetAllInternshipApplicationFormResponse } from '@shared/models/responses/getAllInternshipApplicationFormResponse';
import { InternshipApplicationModel } from '@shared/models/internshipApplicationModel';
import { environment } from 'src/environments/environment';
import { NoticeService } from '@core/notification/notice.service';

@Component({
  selector: 'app-request-management',
  templateUrl: './request-management.component.html',
  styleUrls: ['./request-management.component.scss'],
})
export class RequestManagementComponent implements OnInit {
  requestsData = new BehaviorSubject<InternshipApplicationModel[]>([]);
  baseUrl = environment.ApiUrl;
  fakeStudent = [
    {
      id: '1',
      applicationForm: 'www.uskudar.edu.tr',
      transcriptStatus: 'not uploaded',
      status: 'pending',
    },
    {
      id: '2',
      applicationForm: 'www.uskudar.edu.tr',
      transcriptStatus: 'not uploaded',
      status: 'pending',
    },
  ];

  constructor(private requestHttp: RequestManagementHttpService , private notification:NoticeService) {}
  ngOnInit() {
    this.getApplicationRequests();
  }

  updateStatus(status: string, id: string) {
    let model: UpdateApplicationStatusRequest = {
      id: id,
      status: status,
    };
    this.requestHttp.updateRequestStatus(model).subscribe({
      next: () => {
        this.notification.successNotice("Status Updated");
        this.getApplicationRequests();
      },
      error: (err) => console.log(err),
    });
  }
  getApplicationRequests() {
    this.requestHttp.getAllRequests('application').subscribe({
      next: (response: GetAllInternshipApplicationFormResponse) => {
        this.requestsData.next(response.data);
      },
      error: (err) => console.log(err),
    });
  }
  getStatusBadgeClass(status: string) {
    let badgeClass = '';

    switch (status) {
      case 'pending':
        badgeClass = 'badge badge-warning';
        break;
      case 'approved':
        badgeClass = 'badge badge-success';
        break;
      case 'completed':
        badgeClass = 'badge badge-secondary';
        break;
      case 'rejected':
        badgeClass = 'badge badge-danger';
        break;
    }

    return badgeClass;
  }
}
