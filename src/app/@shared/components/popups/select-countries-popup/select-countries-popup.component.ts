import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UpdatePromoterTargetCountriesRequest } from '@features/promoter/_models/requests/updatePromoterTargetCountriesRequest';
import { PromoterStateActions } from '@features/promoter/_store/actions/promoter-state.actions';
import { PromoterState } from '@features/promoter/_store/states/promoter.state';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CountriesModel } from '@shared/data/countries/countriesModel';
import { CountriesDataService } from '@shared/data/countries/services/countries-data.service';
import { IBus } from '@shared/state-bus/IBus';

@Component({
  selector: 'app-select-countries-popup',
  templateUrl: './select-countries-popup.component.html',
  styleUrls: ['./select-countries-popup.component.scss'],
})
export class SelectCountriesPopupComponent implements OnInit {
  @Output() saveSelectedCountries = new EventEmitter<any[]>();
  @Input() oldCountries: string[];
  selectedCountries: string[] = [];
  countries: CountriesModel[] = [];
  query: any;
  constructor(private modalService: NgbModal, private countriesData: CountriesDataService, private stateBus: IBus) {}
  ngOnInit(): void {
    this.loadData();
  }
  openModal(content: any) {
    this.selectedCountries.push(...this.oldCountries);
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
    this.saveSelectedCountries.emit(this.selectedCountries);
  }
}
