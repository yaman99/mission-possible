import { HttpClient } from '@angular/common/http';
import { Component, } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.scss']
})
export class AddApplicationComponent  {
  applicationFile : File;
  transcriptFile : File;


  usersForm: FormGroup;
  fileName='';
  showToolbar : boolean;
  showToolbarTranscript : boolean;
  compulsory1Checked: boolean = false;
  compulsory2Checked: boolean = false;
  voluntaryChecked: boolean = false;
  constructor(private http : HttpClient){}

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
  onFileSelectedTranscript(event: any){
    const file:File = event!.target!.files[0];


    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);

        const upload$ = this.http.post("/api/thumbnail-upload", formData);

        upload$.subscribe();
    }
}
onFileSelectedApplication(event : any){
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
  toggleToolbarTranscript(){
    this.showToolbarTranscript = !this.showToolbarTranscript;

  }
  checkifformValid() {
    return this.usersForm.valid;
  }
  onSubmit(){
    const formData = new FormData()


  }

}
