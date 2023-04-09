import { PromoterStateActions } from '@features/promoter/_store/actions/promoter-state.actions';
import { Observable } from 'rxjs';
import { IBus } from '@shared/state-bus/IBus';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CountriesModel } from '@shared/data/countries/countriesModel';
import { CountriesDataService } from '@shared/data/countries/services/countries-data.service';
import { AuthBaseState, AuthStateActions } from '@features/auth';
import { User } from '@features/auth/models/user';
import { UpdatePhoneModel } from '@features/auth/models/updateUser.model';
import { Select } from '@ngxs/store';
import { PromoterState } from '@features/promoter/_store/states/promoter.state';
import { UpdatePromoterRequest } from '@features/promoter/_models/requests/updatePromoterLocationRequest';

@Component({
  selector: 'app-profile-form-modal',
  templateUrl: './profile-form-modal.component.html',
  styleUrls: ['./profile-form-modal.component.scss'],
})
export class ProfileFormModalComponent implements OnInit {
  promoterId: string;
  profileForm: FormGroup;
  countries: CountriesModel[] = [];
  constructor(private modalService: NgbModal, private fb: FormBuilder, private countriesData: CountriesDataService, private stateBus: IBus) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCountries();
    this.getData();
  }
  openModal(content: any) {
    this.modalService.open(content, { size: 'lg' }).result.then(
      () => {
        this.saveChanges();
      },
      () => {}
    );
  }
  initForm() {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      location: ['', Validators.required],
    });
  }
  getData() {
    const promoter = this.stateBus.getSnapshot(PromoterState.promoter);
    this.profileForm.patchValue(promoter);
  }
  loadCountries() {
    this.countries = this.countriesData.countries;
  }
  saveChanges() {
    this.promoterId = this.stateBus.getSnapshot(PromoterState.promoterId);
    let model: UpdatePromoterRequest = {
      promoterId: this.promoterId,
      location: this.profileForm.controls.location.value,
      firstName: this.profileForm.controls.firstName.value,
      lastName: this.profileForm.controls.lastName.value,
    };

    this.stateBus.excuteAction(new PromoterStateActions.Update(model));
  }
}
