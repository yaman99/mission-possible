import { Component, OnInit } from '@angular/core';
import { UpdateApplicationStatusRequest } from '../models/requests/updateApplicationStatusRequest';
import { CoordinatorHttpService } from '../services/coordinator-http.service';
import { ApplicationRequestModel } from '../models/applicationRequestModel';

@Component({
  selector: 'app-request-management',
  templateUrl: './request-management.component.html',
  styleUrls: ['./request-management.component.scss']
})
export class RequestManagementComponent implements OnInit {
  requestsData:ApplicationRequestModel[];

  fakeStudent = [{
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
  }
  ];

  constructor(private coHttp: CoordinatorHttpService) { }
  ngOnInit() {
    this.getApplicationRequests()
  }


  updateStatus(status: string, id: string) {
    let model: UpdateApplicationStatusRequest = {
      id: id,
      status: status
    }
    this.coHttp.updateApplicationRequestStatus(model).subscribe({
      next: () => { console.log('status and id updated') }, //we should update the status according to our database
      error: (err) => console.log(err)
    });
  }
  getApplicationRequests(){
    this.coHttp.getAllApplicationRequests().subscribe({
      next: (response) => {
        this.requestsData = response.data
      },
      error: (err) => console.log(err)
    })
  }

}
