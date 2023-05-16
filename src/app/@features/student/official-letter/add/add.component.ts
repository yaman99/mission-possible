import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


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

  get form() {
    return this.usersForm.controls;
  }



  constructor(private fb: FormBuilder, private router: Router , private http : HttpClient) { }

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

    }
    if (checkbox === 'compulsory2') {
      this.compulsory1Checked = false;
      this.compulsory2Checked = true;
      this.voluntaryChecked = false;
    }
    if (checkbox === 'voluntary') {
      this.compulsory1Checked = false;
      this.compulsory2Checked = false;
      this.voluntaryChecked = true;
    }
  }
  onFileSelected(event : any) {
    const file:File = event!.target!.files[0];


    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);

        const upload$ = this.http.post("/api/thumbnail-upload", formData);

        upload$.subscribe();
    }
}
  toggleToolbar(){
    this.showToolbar = !this.showToolbar;
  }
  checkifformValid() {
    return this.usersForm.valid;
  }
  saveChanges() {
    // console.log(this.form.isActive.value);
    let model = {
      companyName: this.form.companyName.value,


    };

    console.log(model);
    this.router.navigate(['/st/official-letter/list']);
  }
}
