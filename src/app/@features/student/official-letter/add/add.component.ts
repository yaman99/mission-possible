import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NoticeService } from '@core/notification/notice.service';
import { OfficialLetterPaths } from '@features/student/_commonPaths/officialLetterPaths.constants';
import { StudentPaths } from '@features/student/_commonPaths/studentPaths.constants';
import { RequestManagementHttpService } from '@shared/services/request-management.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  fileName = '';

  compulsory1Checked: boolean = false;
  compulsory2Checked: boolean = false;
  voluntaryChecked: boolean = false;


  usersForm: FormGroup;
  updateMode = false;

  showToolbar: boolean = false;

  transcriptFile: File;
  formData = new FormData();
  internshipType: string;
  get form() {
    return this.usersForm.controls;
  }



  constructor(private fb: FormBuilder,
     private studentHtppServ: RequestManagementHttpService,
    private notification: NoticeService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.usersForm = this.fb.group({
      companyName: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
    });
  }
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
  toggleToolbar(){
    this.showToolbar = !this.showToolbar;
  }
  checkifformValid() {
    return this.usersForm.valid;
  }


  onSubmit() {
    this.formData.append('transcript', this.transcriptFile);
    this.formData.append('internshipType', this.internshipType);
    this.formData.append('companyName', this.form.companyName.value);
    this.studentHtppServ.addOfficialRequest(this.formData).subscribe({
      next: () => {
        this.notification.successNotice('Your Request Created Successfully');
        this.router.navigate(OfficialLetterPaths.listComponents);
      },
    });
  }
}
