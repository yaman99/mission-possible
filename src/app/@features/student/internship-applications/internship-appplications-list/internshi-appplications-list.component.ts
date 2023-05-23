import { Component, OnInit } from '@angular/core';
import { StudentPaths } from '@features/student/_commonPaths/studentPaths.constants';
import { InternshipApplicationModel } from '@features/student/models/internshipApplicationModel';
import { UpdateInternshipApplicationRequest } from '@features/student/models/requests/updateInternshipApplicationStatusRequest';
import { StudentHttpService } from '@features/student/services/student-http.service';

@Component({
  selector: 'app-internshi-appplications-list',
  templateUrl: './internshi-appplications-list.component.html',
  styleUrls: ['./internshi-appplications-list.component.scss']
})
export class InternshiAppplicationsListComponent implements OnInit {
  paths = {
    addApplication: StudentPaths.addApplicationComponents
  }
  internshipApplicationRequests: InternshipApplicationModel[];


  constructor(private stuService: StudentHttpService) { }
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
      }
    })

  }
  updateInternshipApplicationRequest(id:string,applicationUrl : string, transcriptUrl : string){
    let model : UpdateInternshipApplicationRequest = {
      id: id,
      applicationUrl: applicationUrl,
      transcriptUrl: transcriptUrl
    }
    this.stuService.updateInternshipApplicationRequest(model).subscribe({
      next: () => {
        console.log("application is updated");

      },
      error: (error: any) => {
        console.log(error);
      }

    })
  }



}
