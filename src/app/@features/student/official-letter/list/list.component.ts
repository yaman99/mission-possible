import { Component, OnInit } from '@angular/core';
import { NoticeService } from '@core/notification/notice.service';
import { OfficialLetterPathActions, OfficialLetterPaths } from '@features/student/_commonPaths/officialLetterPaths.constants';
import { officialLetterModel } from '@shared/models/officialLetterModel';
import { GetAllOfficialLetterResponse } from '@shared/models/responses/getAllOfficialLetterResponse';
import { RequestManagementHttpService } from '@shared/services/request-management.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  currentDate = new Date();
  officialLetterRequests = new BehaviorSubject<officialLetterModel[]>([]);
  paths={
    list :OfficialLetterPaths.listComponents,
    addOfficialLetter : OfficialLetterPaths.addOfficialLetterComponents
  }
  baseUrl = environment.ApiUrl;
  constructor(private stuService: RequestManagementHttpService, private alertMessage: NoticeService) { }
  ngOnInit(): void {
    this.getAllAplicationFormRequests();
  }

  getAllAplicationFormRequests() {
    this.stuService.getAllStudentRequests("official").subscribe((res:GetAllOfficialLetterResponse) => {
      this.officialLetterRequests.next(res.data);
    });
  }
}
