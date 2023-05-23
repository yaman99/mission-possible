import { Component, OnInit } from '@angular/core';
import { OfficialLetterRequestModel } from '../models/officialLetterRequestModel';
import { HttpClient } from '@angular/common/http';
import { UpdateOfficialLetterStatusRequest } from '../models/requests/updateOfficialLetterStatusRequest';
import { CoordinatorHttpService } from '../services/coordinator-http.service';

@Component({
  selector: 'app-official-letter-requests',
  templateUrl: './official-letter-requests.component.html',
  styleUrls: ['./official-letter-requests.component.scss']
})
export class OfficialLetterRequestsComponent implements OnInit {
  officialLetterRequest: OfficialLetterRequestModel[];
  fakeStudent = [{
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
  }
  ];


  constructor(private coHttp: CoordinatorHttpService) { }
  ngOnInit() {
    this.getofficialLetterRequests()

  }
  updateStatus(status: string, id: string, url: string) {
    let model: UpdateOfficialLetterStatusRequest = {
      id: id,
      status: status,
      url: url
    }
    this.coHttp.updateOfficialLetterRequestStatus(model).subscribe({
      next: () => {
        console.log("stauts is updated");

      },
      error: (error) => {
        console.log(error);

      }
    })

  }
  getofficialLetterRequests(){
    this.coHttp.getAllOfficialLetterRequests().subscribe({
      next: (data) => {
        this.officialLetterRequest = data.officialLetterData;
      },
      error: (error) => {
        console.log(error);

      }
    })

  }


}
