import { UpdatePromoterTargetCountriesRequest } from '@features/promoter/_models/requests/updatePromoterTargetCountriesRequest';
import { IBus } from '@shared/state-bus/IBus';
import { CountriesDataService } from '@shared/data/countries/services/countries-data.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CountriesModel } from '@shared/data/countries/countriesModel';
import { Select } from '@ngxs/store';
import { PromoterState } from '@features/promoter/_store/states/promoter.state';
import { Observable } from 'rxjs';
import { PromoterStateActions } from '@features/promoter/_store/actions/promoter-state.actions';

@Component({
  selector: 'app-target-countries-modal',
  templateUrl: './target-countries-modal.component.html',
  styleUrls: ['./target-countries-modal.component.scss'],
})
export class TargetCountriesModalComponent implements OnInit {
  selectedCountries: string[] = [];
  countries: CountriesModel[] = [];
  query: any;
  constructor(private modalService: NgbModal, private countriesData: CountriesDataService, private stateBus: IBus) {}
  ngOnInit(): void {
    this.loadData();
  }
  openModal(content: any) {
    const countries = this.stateBus.getSnapshot(PromoterState.promoter).targetCountries;
    this.selectedCountries.push(...countries);
    this.modalService
      .open(content, { size: 'lg' })
      .result.then(
        () => {
          this.saveChanges();
        },
        () => {}
      )
      .finally(() => {
        this.selectedCountries = [];
      });
  }

  loadData() {
    this.countries = this.countriesData.countries;
  }
  validateBeforeSelect(code: string) {
    const value = this.selectedCountries.find((x) => x === code);
    return value ? true : false;
  }
  getCounrty(code: string) {
    return this.countries.find((x) => x.alpha2 === code);
  }
  selectCountry(e: any) {
    const value = e.target.value;
    if (!this.validateBeforeSelect(value)) {
      this.selectedCountries.push(value);
    }
  }
  removeCountry(code: string) {
    const index = this.selectedCountries.findIndex((x) => x === code);
    this.selectedCountries.splice(index, 1);
  }

  saveChanges() {
    const promoterId = this.stateBus.getSnapshot(PromoterState.promoterId);
    let model: UpdatePromoterTargetCountriesRequest = {
      countries: this.selectedCountries,
      promoterId: promoterId,
    };
    this.stateBus.excuteAction(new PromoterStateActions.UpdateTargetCountries(model));
  }
}
