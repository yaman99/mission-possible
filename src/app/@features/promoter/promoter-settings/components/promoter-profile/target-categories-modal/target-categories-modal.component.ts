import { IBus } from '@shared/state-bus/IBus';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesModel } from '@shared/data/categories/categoriesModel';
import { CategoriesDataService } from '@shared/data/categories/services/categories-data.service';
import { UpdatePromoterTargetCategoriesRequest } from '@features/promoter/_models/requests/updatePromoterTargetCategoriesRequest';
import { PromoterStateActions } from '@features/promoter/_store/actions/promoter-state.actions';
import { PromoterState } from '@features/promoter/_store/states/promoter.state';

@Component({
  selector: 'app-target-categories-modal',
  templateUrl: './target-categories-modal.component.html',
  styleUrls: ['./target-categories-modal.component.scss'],
})
export class TargetCategoriesModalComponent implements OnInit {
  constructor(private modalService: NgbModal, private categoriesData: CategoriesDataService, private stateBus: IBus) {}

  selectedCategories: any[] = [];
  categories: CategoriesModel[] = [];
  query: any;
  ngOnInit(): void {
    this.loadData();

  }
  openModal(content: any) {
    const categories = this.stateBus.getSnapshot(PromoterState.promoter).targetCategories;
    this.selectedCategories.push(...categories);
    this.modalService.open(content, { size: 'lg' }).result.then(
      () => {
        this.saveChanges();
      },
      () => {}
    ).finally(() => {
      this.selectedCategories = [];
    });
  }

  loadData() {
    this.categories = this.categoriesData.categories;
  }
  checkIfSelected(code: string) {
    const value = this.selectedCategories.find((x) => x === code);
    return value ? true : false;
  }
  getCategory(code: string) {
    console.log(code);

    return this.categories.find((x) => x.code === code);
  }
  selectCategory(e: any) {
    const value = e.target.value;
    if (!this.checkIfSelected(value)) {
      this.selectedCategories.push(value);
    }
  }
  removeCategory(code: string) {
    const index = this.selectedCategories.findIndex((x) => x === code);
    this.selectedCategories.splice(index, 1);
  }
  saveChanges() {
    const promoterId = this.stateBus.getSnapshot(PromoterState.promoterId);
    let model: UpdatePromoterTargetCategoriesRequest = {
      categories: this.selectedCategories,
      promoterId: promoterId,
    };
    this.stateBus.excuteAction(new PromoterStateActions.UpdateTargetCategories(model));
  }
}
