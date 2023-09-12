interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Researcher'],
  customerRoles: ['3rd Party Vendor'],
  tenantRoles: ['Builder', 'Fielder', 'Researcher', 'Data Processor'],
  tenantName: 'Organization',
  applicationName: 'Srvy',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Interact with surveys provided by the Organization',
    'Provide feedback on surveys to the Organization',
  ],
  ownerAbilities: [
    'Manage an Organization',
    'Invite Builders, Fielders, and Data Processors to the Organization',
    'Remove Builders, Fielders, and Data Processors from the Organization',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/f31e97f3-1145-4e67-8c2c-eb91acd4924a',
};
