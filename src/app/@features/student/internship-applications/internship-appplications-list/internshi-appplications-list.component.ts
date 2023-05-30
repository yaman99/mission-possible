import { Observable, BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NoticeService } from '@core/notification/notice.service';
import { StudentPaths } from '@features/student/_commonPaths/studentPaths.constants';
import { DeleteInternshipApplicationRequest } from '@shared/models/requests/deleteInternshipApplicationRequest';
import { UpdateInternshipApplicationRequest } from '@shared/models/requests/updateInternshipApplicationStatusRequest';
import { RequestManagementHttpService } from '@shared/services/request-management.service';
import { environment } from 'src/environments/environment';
import { InternshipApplicationModel } from '@shared/models/internshipApplicationModel';
import { GetAllInternshipApplicationFormResponse } from '@shared/models/responses/getAllInternshipApplicationFormResponse';

@Component({
  selector: 'app-internshi-appplications-list',
  templateUrl: './internshi-appplications-list.component.html',
  styleUrls: ['./internshi-appplications-list.component.scss'],
})
export class InternshiAppplicationsListComponent implements OnInit {
  paths = {
    addApplication: StudentPaths.addApplicationComponents,
  };
  baseUrl = environment.ApiUrl;
  internshipApplicationRequests = new BehaviorSubject<InternshipApplicationModel[]>([]);

  constructor(private stuService: RequestManagementHttpService, private alertMessage: NoticeService) {}
  ngOnInit() {
    this.getAllAplicationFormRequests();
  }
  getAllAplicationFormRequests() {
    this.stuService.getAllStudentRequests("application").subscribe((res:GetAllInternshipApplicationFormResponse) => {
      this.internshipApplicationRequests.next(res.data);
    });
  }
  // updateInternshipApplicationRequest(id: string, applicationUrl: string, transcriptUrl: string) {
  //   let model: UpdateInternshipApplicationRequest = {
  //     id: id,
  //     applicationUrl: applicationUrl,
  //     transcriptUrl: transcriptUrl,
  //   };
  //   this.stuService.updateInternshipApplicationRequest(model).subscribe({
  //     next: () => {
  //       console.log('application is updated');
  //     },
  //     error: (error: any) => {
  //       console.log(error);
  //     },
  //   });
  // }

  deleteInternshipApplicationRequest(id: string) {
    this.alertMessage.askAlert('Are you sure to delete this request' , "Confirm").then((res) => {
      if (res) {
        let model: DeleteInternshipApplicationRequest = {
          id: id,
        };
        this.stuService.deleteRequest(model).subscribe({
          next: () => {
            console.log('application is deleted');
            this.getAllAplicationFormRequests();
          },
          error: (error: any) => {
            console.log(error);
          },
        });
      }
    });
  }
}
