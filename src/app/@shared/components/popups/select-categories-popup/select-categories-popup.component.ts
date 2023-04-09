import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UpdatePromoterTargetCategoriesRequest } from '@features/promoter/_models/requests/updatePromoterTargetCategoriesRequest';
import { PromoterStateActions } from '@features/promoter/_store/actions/promoter-state.actions';
import { PromoterState } from '@features/promoter/_store/states/promoter.state';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesModel } from '@shared/data/categories/categoriesModel';
import { CategoriesDataService } from '@shared/data/categories/services/categories-data.service';
import { IBus } from '@shared/state-bus/IBus';

@Component({
  selector: 'app-select-categories-popup',
  templateUrl: './select-categories-popup.component.html',
  styleUrls: ['./select-categories-popup.component.scss'],
})
export class SelectCategoriesPopupComponent implements OnInit {
  constructor(private modalService: NgbModal, private categoriesData: CategoriesDataService) {}

  @Output() saveSelectedCategories = new EventEmitter<any[]>();
  @Input() oldCategories: string[];
  selectedCategories: any[] = [];
  categories: CategoriesModel[] = [];
  query: any;
  ngOnInit(): void {
    this.loadData();
  }
  openModal(content: any) {
    this.selectedCategories.push(...this.oldCategories);
    this.modalService
      .open(content, { size: 'lg' })
      .result.then(
        () => {
          this.saveChanges();
        },
        () => {}
      )
      .finally(() => {
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
    this.saveSelectedCategories.emit(this.selectedCategories);
  }
}
