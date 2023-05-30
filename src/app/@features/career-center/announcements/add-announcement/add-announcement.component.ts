import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnouncementPaths } from '@features/career-center/_commonPaths/announcementPaths.constants';
import { AddNewAnnouncementRequest } from '@shared/models/announcements/requests/addNewAnnouncementRequest';
import { AnnouncementManagementService } from '@shared/services/announcement-management.service';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.scss'],
})
export class AddAnnouncementComponent implements OnInit {
  usersForm: FormGroup;
  updateMode = false;

  get form() {
    return this.usersForm.controls;
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private annServ: AnnouncementManagementService
  ) {}
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.usersForm = this.fb.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      content: ['', Validators.compose([Validators.required, Validators.minLength(20)])],
      url: ['', Validators.compose([Validators.required])],
    });
  }
  checkifformValid() {
    return this.usersForm.valid;
  }
  saveChanges() {
    let model: AddNewAnnouncementRequest = {
      title: this.form.title.value,
      content: this.form.content.value,
      url: this.form.url.value,
    };
    this.annServ.addNewAnnouncement(model).subscribe({
      next: () => {
        this.router.navigate([AnnouncementPaths.listComponents]);
      },
    });
  }
}
