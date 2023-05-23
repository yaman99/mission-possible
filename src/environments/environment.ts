// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appVersion: 'v8.0.38',
  USERDATA_KEY: 'authf649fc9a5f55asd',
  isMockEnabled: true,
  authApiUrl: 'http://localhost:5001/auth',
  notificationApiUrl: 'http://localhost:5001/notification',
  coordinatorApiUrl: 'http://localhost:5001/coordinator',
  workspaceApiUrl: 'http://indanalocal.com/api/workspace',
  itemApiUrl: 'http://indanalocal.com/api/item',
  campaignApiUrl: 'http://indanalocal.com/api/campaign',
  conversionApiUrl: 'http://indanalocal.com/api/conversion',
  campaignAggregatorUrl: 'http://indanalocal.com/api/campaign-ag',
  promoterApiUrl: 'http://indanalocal.com/api/promoter',
  affiliateApiUrl: 'http://indanalocal.com/api/affiliate',
  WalletApiUrl: 'http://indanalocal.com/api/wallet',
  integrationApiUrl: 'http://indanalocal.com/api/integration',
  insightsApiUrl: 'http://indanalocal.com/api/insight',
  integrationCallbackUrl: 'http://localhost:4200/w/settings/integration',
  stateMangementSecretKey: '123asdzxc',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
