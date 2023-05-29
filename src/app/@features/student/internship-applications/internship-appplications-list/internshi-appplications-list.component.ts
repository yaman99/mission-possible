import { Component, OnInit } from '@angular/core';
import { NoticeService } from '@core/notification/notice.service';
import { StudentPaths } from '@features/student/_commonPaths/studentPaths.constants';
import { InternshipApplicationModel } from '@features/student/models/internshipApplicationModel';
import { DeleteInternshipApplicationRequest } from '@features/student/models/requests/deleteInternshipApplicationRequest';
import { UpdateInternshipApplicationRequest } from '@features/student/models/requests/updateInternshipApplicationStatusRequest';
import { StudentHttpService } from '@features/student/services/student-http.service';

@Component({
  selector: 'app-internshi-appplications-list',
  templateUrl: './internshi-appplications-list.component.html',
  styleUrls: ['./internshi-appplications-list.component.scss'],
})
export class InternshiAppplicationsListComponent implements OnInit {
  paths = {
    addApplication: StudentPaths.addApplicationComponents,
  };
  internshipApplicationRequests: InternshipApplicationModel[];

  constructor(private stuService: StudentHttpService, private alertMessage: NoticeService) { }
  ngOnInit() {
    this.getAllAplicationFormRequests();
  }
  getAllAplicationFormRequests() {
    this.stuService.getAllInternshipApplicationRequests().subscribe({
      next: (data: any) => {
        this.internshipApplicationRequests = data.applicationFormData;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  updateInternshipApplicationRequest(id: string, applicationUrl: string, transcriptUrl: string) {
    let model: UpdateInternshipApplicationRequest = {
      id: id,
      applicationUrl: applicationUrl,
      transcriptUrl: transcriptUrl,
    };
    this.stuService.updateInternshipApplicationRequest(model).subscribe({
      next: () => {
        console.log('application is updated');
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  deleteInternshipApplicationRequest(id: string) {
    this.alertMessage.askAlert("Are you sure to delete this request").then(res => {
      if (res) {
        let model: DeleteInternshipApplicationRequest = {
          id: id,
        };
        this.stuService.deleteInternshipApplicationRequest(model).subscribe({
          next: () => {
            console.log('application is deleted');
          },
          error: (error: any) => {
            console.log(error);
          },
        });
      }
    });
  }
}
