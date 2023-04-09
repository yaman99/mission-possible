import { Injectable } from '@angular/core';
import { IntegrationThirdParties } from '@shared/constants/integrationThirdParties';

@Injectable({
  providedIn: 'root',
})
export class BrandsDetailsService {
  private stores = [
    {
      name: IntegrationThirdParties.salla,
      logo: './assets/media/logos/salla.png',
    },
    {
      name: 'Zid',
      logo: './assets/media/logos/zid.png',
    },
  ];

  getStore(name: IntegrationThirdParties) {
    return this.stores.find((x) => x.name === name);
  }
  constructor() {}
}
