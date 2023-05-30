import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NoticeService } from '@core/notification/notice.service';
import { StudentPaths } from '@features/student/_commonPaths/studentPaths.constants';
import { RequestManagementHttpService } from '@shared/services/request-management.service';

@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.scss'],
})
export class AddApplicationComponent {
  applicationFile: File;
  transcriptFile: File;
  formData = new FormData();
  usersForm: FormGroup;
  fileName = '';
  showToolbar: boolean;
  showToolbarTranscript: boolean;
  compulsory1Checked: boolean = false;
  compulsory2Checked: boolean = false;
  voluntaryChecked: boolean = false;
  internshipType: string;
  constructor(
    private studentHtppServ: RequestManagementHttpService,
    private notification: NoticeService,
    private route: Router
  ) {}

  handleCheckboxChange(checkbox: string) {
    if (checkbox === 'compulsory1') {
      this.compulsory1Checked = true;
      this.compulsory2Checked = false;
      this.voluntaryChecked = false;
      this.internshipType = checkbox;
    }
    if (checkbox === 'compulsory2') {
      this.compulsory1Checked = false;
      this.compulsory2Checked = true;
      this.voluntaryChecked = false;
      this.internshipType = checkbox;
    }
    if (checkbox === 'voluntary') {
      this.compulsory1Checked = false;
      this.compulsory2Checked = false;
      this.voluntaryChecked = true;
      this.internshipType = checkbox;
    }
  }
  onFileSelectedTranscript(event: any) {
    this.transcriptFile = event.target.files[0];
  }
  onFileSelectedApplication(event: any) {
    this.applicationFile = event.target.files[0];
  }

  toggleToolbar() {
    this.showToolbar = !this.showToolbar;
  }
  toggleToolbarTranscript() {
    this.showToolbarTranscript = !this.showToolbarTranscript;
  }
  checkifformValid() {
    return this.usersForm.valid;
  }
  onSubmit() {
    this.formData.append('transcript', this.transcriptFile);
    this.formData.append('applicationForm', this.applicationFile);
    this.formData.append('internshipType', this.internshipType);
    this.studentHtppServ.addNewApplicationRequest(this.formData).subscribe({
      next: () => {
        this.notification.successNotice('Your Request Created Successfully');
        this.route.navigate(StudentPaths.internshipApplicationListComponents);
      },
    });
  }
}
