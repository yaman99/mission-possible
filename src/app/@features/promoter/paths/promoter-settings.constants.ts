export const BasePath = 'settings';
export const PromoterSettingsActions = {
  account: 'account',
  profile: 'profile',
  payment: 'payment',
};

let promoterSettingsPaths: IPromoterSettingsPaths = {
  basePath: BasePath,
  profile: `${PromoterSettingsActions.profile}`,
  payment: `${PromoterSettingsActions.payment}`,
  account: `${PromoterSettingsActions.account}`,
  accountComponents: [],
  profileComponents: [],
  paymentComponents: [],
};

promoterSettingsPaths = {
  ...promoterSettingsPaths,
  accountComponents: ['/p/', BasePath, promoterSettingsPaths.account],
  profileComponents :['/p/' , BasePath , promoterSettingsPaths.profile],
  paymentComponents: ['/p/' , BasePath , promoterSettingsPaths.payment],
};

interface IPromoterSettingsPaths {
  readonly basePath: string;
  readonly profile: string;
  readonly payment: string;
  readonly account: string;
  readonly accountComponents: string[];
  readonly profileComponents: string[];
  readonly paymentComponents: string[];
}
export const PromoterSettingsPaths: IPromoterSettingsPaths = promoterSettingsPaths;
