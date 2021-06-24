export default {
  apiEndPoints: {
    getLogin: 'auth',
    getOtp: 'auth/auth-otp',
    getForgotPassword: 'forgotpassword',
    getCompanylist: 'companies',
    getBatchlist: 'batches',
    getOnboard: 'users/new-onboard',
    getUpdatePassword: 'updatepassword',
    createBatch: 'batches/create',
    clientTaxonomy: 'clientTaxonomies',
    getKeyIssues: 'key_issues',
    getMasterTaxonomy: 'taxonomies',
    getRoles: 'role',
    getRoleAssignment: 'users/assign-role',
    roleAssignmentEdit: 'users/assign-role',
    getRoleFileOnboarding: '/users/new-onboard/upload-emails-file',
    getRoleListOnboarding: '/users/new-onboard/send-mails',
  },
  apiBaseUrl: {
    dev: 'http://65.1.140.116:9010/',
    prod: 'http://65.1.140.116:9010/',
  },
};
