export const BasePath = 'settings';
export const WorkspaceSettingsActions = {
  account: 'account',
  workspace: 'workspace',
  payment: 'payment',
  integration: 'integration',
};

let workspaceSettingsPaths: IWorkspaceSettingsPaths = {
  basePath: BasePath,
  workspace: `${WorkspaceSettingsActions.workspace}`,
  payment: `${WorkspaceSettingsActions.payment}`,
  account: `${WorkspaceSettingsActions.account}`,
  integration: `${WorkspaceSettingsActions.integration}`,
  accountComponents: [],
  workspaceComponents: [],
  paymentComponents: [],
  integrationComponents: []
};

workspaceSettingsPaths = {
  ...workspaceSettingsPaths,
  accountComponents: ['/w/', BasePath, workspaceSettingsPaths.account],
  workspaceComponents :['/w/' , BasePath , workspaceSettingsPaths.workspace],
  paymentComponents: ['/w/' , BasePath , workspaceSettingsPaths.payment],
  integrationComponents: ['/w/' , BasePath , workspaceSettingsPaths.integration],
};

interface IWorkspaceSettingsPaths {
  readonly basePath: string;
  readonly workspace: string;
  readonly payment: string;
  readonly account: string;
  readonly integration: string;
  readonly accountComponents: string[];
  readonly workspaceComponents: string[];
  readonly paymentComponents: string[];
  readonly integrationComponents: string[];
}
export const WorkspaceSettingsPaths: IWorkspaceSettingsPaths = workspaceSettingsPaths;
