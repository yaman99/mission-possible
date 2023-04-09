import { TranslationService } from './../../../i18n/translation.service';
import { Injectable } from '@angular/core';
import { CountriesAR } from '../countries-ar';
import { CountriesEN } from '../countries-en';
import { CountriesModel } from '../countriesModel';

@Injectable({
  providedIn: 'root',
})
export class CountriesDataService {
  private _countries: CountriesModel[];
  public get countries(): CountriesModel[] {
    return this._countries;
  }
  public set countries(v: CountriesModel[]) {
    this._countries = v;
  }
  private selectedLanguage = this.trasnlationService.getSelectedLanguage();

  constructor(private trasnlationService: TranslationService) {
    this.loadCountries();
  }

  getName(code: string) {
    return this._countries.find((x) => x.alpha2 === code)?.name;
  }
  private loadCountries() {
    if (this.selectedLanguage == 'ar') {
      this.countries = CountriesAR;
    } else if (this.selectedLanguage == 'en') {
      this.countries = CountriesEN;
    }
  }
}
