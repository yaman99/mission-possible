import { CountriesDataService } from '@shared/data/countries/services/countries-data.service';
import { Observable } from 'rxjs';
import { IBus } from '@shared/state-bus/IBus';
import { TargetCountriesModalComponent } from './target-countries-modal/target-countries-modal.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TargetCategoriesModalComponent } from './target-categories-modal/target-categories-modal.component';
import { PromoterState } from '@features/promoter/_store/states/promoter.state';
import { Promoter } from '@features/promoter/_models/promoter.model';
import { Select } from '@ngxs/store';
import { UpdatePromoterTargetCategoriesRequest } from '@features/promoter/_models/requests/updatePromoterTargetCategoriesRequest';
import { PromoterStateActions } from '@features/promoter/_store/actions/promoter-state.actions';
import { UpdatePromoterTargetCountriesRequest } from '@features/promoter/_models/requests/updatePromoterTargetCountriesRequest';

@Component({
  selector: 'app-promoter-profile',
  templateUrl: './promoter-profile.component.html',
  styleUrls: ['./promoter-profile.component.scss'],
})
export class PromoterProfileComponent implements OnInit {
  selectedCategories: string[] = [];
  selectedCountries: string[] = [];
  constructor(private modalService: NgbModal, private countriesData: CountriesDataService, private stateBus: IBus) {}
  @Select(PromoterState.promoter) promoter$: Observable<any>;

  ngOnInit(): void {
    this.selectedCategories = this.stateBus.getSnapshot(PromoterState.promoter).targetCategories;
    this.selectedCountries = this.stateBus.getSnapshot(PromoterState.promoter).targetCountries;
  }
  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }
  getCountryName(code: string): string {
    const value = this.countriesData.getName(code);
    if (!value) {
      return '-';
    } else {
      return value;
    }
  }

  saveCategories(selectedCategories: any) {
    const promoterId = this.stateBus.getSnapshot(PromoterState.promoterId);
    let model: UpdatePromoterTargetCategoriesRequest = {
      categories: selectedCategories,
      promoterId: promoterId,
    };
    this.stateBus.excuteAction(new PromoterStateActions.UpdateTargetCategories(model));
  }

  saveCountries(selectedCountries: any) {
    const promoterId = this.stateBus.getSnapshot(PromoterState.promoterId);
    let model: UpdatePromoterTargetCountriesRequest = {
      countries: selectedCountries,
      promoterId: promoterId,
    };
    this.stateBus.excuteAction(new PromoterStateActions.UpdateTargetCountries(model));
  }
}
