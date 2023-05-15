import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.scss']
})
export class AddAnnouncementComponent implements OnInit {
  usersForm: FormGroup;
  updateMode = false;

  get form() {
    return this.usersForm.controls;
  }



  constructor(private fb: FormBuilder,private router : Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.usersForm = this.fb.group({
      title: ['', Validators.compose([Validators.required,Validators.minLength(5)])],
      content: ['', Validators.compose([Validators.required,Validators.minLength(20)])],
    });
}
checkifformValid() {
  return this.usersForm.valid;
}
saveChanges() {
  // console.log(this.form.isActive.value);
  let model = {
    title: this.form.title.value,
    content: this.form.content.value,
  };

  console.log(model);
  // this.router.navigate(['/co/announcements/announcementsList']);
}
}
