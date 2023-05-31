import { Component, OnInit } from '@angular/core';
import { OfficialLetterRequestModel } from '../models/officialLetterRequestModel';
import { HttpClient } from '@angular/common/http';
import { UpdateOfficialLetterStatusRequest } from '../models/requests/updateOfficialLetterStatusRequest';
import { CoordinatorHttpService } from '../services/coordinator-http.service';
import { RequestManagementHttpService } from '@shared/services/request-management.service';
import { NoticeService } from '@core/notification/notice.service';
import { UpdateApplicationStatusRequest } from '@shared/models/requests/updateApplicationStatusRequest';
import { GetAllOfficialLetterResponse } from '@shared/models/responses/getAllOfficialLetterResponse';
import { officialLetterModel } from '@shared/models/officialLetterModel';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-official-letter-requests',
  templateUrl: './official-letter-requests.component.html',
  styleUrls: ['./official-letter-requests.component.scss'],
})
export class OfficialLetterRequestsComponent implements OnInit {
  requestsData = new BehaviorSubject<officialLetterModel[]>([]);
  baseUrl = environment.ApiUrl;
  officialDoc: File;
  formData = new FormData();
  constructor(
    private requestHttp: RequestManagementHttpService,
    private notification: NoticeService
  ) {}
  ngOnInit() {
    this.getofficialLetterRequests();
  }
  updateStatus(status: string, id: string) {
    let model: UpdateApplicationStatusRequest = {
      id: id,
      status: status,
    };
    this.requestHttp.updateRequestStatus(model).subscribe({
      next: () => {
        this.notification.successNotice('Status Updated');
        this.getofficialLetterRequests();
      },
      error: (err) => console.log(err),
    });
  }
  getofficialLetterRequests() {
    this.requestHttp.getAllRequests('official').subscribe({
      next: (response: GetAllOfficialLetterResponse) => {
        this.requestsData.next(response.data);
      },
      error: (err) => console.log(err),
    });
  }
  onFileSelected(e: any, requestId: string) {
    this.officialDoc = e.target.files[0];
    this.formData.append('id', requestId);
    this.formData.append('file', this.officialDoc);
    this.formData.append('type', 'official');
    this.requestHttp.uploadOfficialLetter(this.formData).subscribe({
      next: () => {
        this.notification.successNotice('Official Letter Uploaded Successfully');
        this.getofficialLetterRequests();
      },
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
