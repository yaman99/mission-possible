import { UpdatePromoterRequest } from '@features/promoter/_models/requests/updatePromoterLocationRequest';
import { UpdatePromoterProfilePicRequest } from '@features/promoter/_models/requests/updatePromoterProfilePicRequest';
import { UpdatePromoterTargetCategoriesRequest } from '@features/promoter/_models/requests/updatePromoterTargetCategoriesRequest';
import { UpdatePromoterTargetCountriesRequest } from '@features/promoter/_models/requests/updatePromoterTargetCountriesRequest';

export namespace PromoterStateActions {
  export class Get {
    static readonly type = '[Promoter] Get Promoter';
    constructor(public promoter: string) {}
  }
  export class NavigateToDashboard {
    static readonly type = '[Promoter] Navigate To Dashboard';
    constructor() {}
  }

  export class Update {
    static readonly type = '[Promoter] Update Promoter';
    constructor(public payload: UpdatePromoterRequest) {}
  }

  export class UpdateTargetCountries {
    static readonly type = '[Promoter] Update Promoter TargetCountries';
    constructor(public payload: UpdatePromoterTargetCountriesRequest) {}
  }

  export class UpdateTargetCategories {
    static readonly type = '[Promoter] Update Promoter TargetCategories';
    constructor(public payload: UpdatePromoterTargetCategoriesRequest) {}
  }

  export class UpdateProfilePic {
    static readonly type = '[Promoter] Update Promoter Profile Picture';
    constructor(public payload: UpdatePromoterProfilePicRequest) {}
  }
}
