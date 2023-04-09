import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommissionService {


  private _commissionPercentage = 30;
  public get commissionPercentage() : number {
    return this._commissionPercentage;
  }
  public set commissionPercentage(v : number) {
    this._commissionPercentage = v;
  }

  constructor() { }

  getCommissionPercentageForPromoter(amount:number){
    const paltformPercentage = (amount * this._commissionPercentage) / 100;
    return amount - paltformPercentage;
  }
  getCommissionFixedPriceForPromoter(amount:number){
    const paltformPrice = (amount * 10) / 100;
    return amount - paltformPrice;
  }
}
