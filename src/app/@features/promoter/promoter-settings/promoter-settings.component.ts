import { Component, OnInit } from '@angular/core';
import { AuthBaseState } from '@features/auth';
import { User } from '@features/auth/models/user';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PromoterSettingsPaths } from '../paths';
import { Promoter } from '../_models/promoter.model';
import { PromoterState } from '../_store/states/promoter.state';

@Component({
  selector: 'app-promoter-settings',
  templateUrl: './promoter-settings.component.html',
  styleUrls: ['./promoter-settings.component.scss']
})
export class PromoterSettingsComponent implements OnInit {
  @Select(AuthBaseState.getUser) user$: Observable<User>;
  @Select(PromoterState.promoter) promoter$: Observable<Promoter>;
  paths ={
    account : PromoterSettingsPaths.accountComponents,
    payment : PromoterSettingsPaths.paymentComponents,
    profile : PromoterSettingsPaths.profileComponents,
  }
  constructor() { }

  ngOnInit(): void {
  }

}
