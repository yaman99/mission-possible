import { Injectable } from '@angular/core';
import { TranslationService } from '@shared/i18n';
import { CategoriesAR } from '../categories-ar';
import { CategoriesEN } from '../categories-en';
import { CategoriesModel } from '../categoriesModel';

@Injectable({
  providedIn: 'root',
})
export class CategoriesDataService {
  private _categories: CategoriesModel[];
  public get categories(): CategoriesModel[] {
    return this._categories;
  }
  public set categories(v: CategoriesModel[]) {
    this._categories = v;
  }
  private selectedLanguage = this.trasnlationService.getSelectedLanguage();

  constructor(private trasnlationService: TranslationService) {
    this.loadCategories();
  }
  getName(code: string) {
    return this._categories.find((x) => x.code === code)?.name;
  }
  private loadCategories() {
    if (this.selectedLanguage == 'ar') {
      this.categories = CategoriesAR;
    } else if (this.selectedLanguage == 'en') {
      this.categories = CategoriesEN;
    }
  }
}
