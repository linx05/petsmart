let accountService, auth, modal, modalOptions, stateParams, state;

export default class AccountController {

	constructor($stateParams, $state, AccountService, AuthService) {
		'ngInject';
		stateParams    = $stateParams;
		accountService = AccountService;
		auth           = AuthService;
		state          = $state;
		modalOptions   = {
			component: '<account-edit></account-edit>',
			title: 'account.edit.title',
			data: {},
			state: 'accounts',
			stateParams: {},
			adminMode: auth.isAdmin(),
		};
	}

	$onInit() {
		this.adminMode   = auth.isAdmin();
		this.selectedTab = stateParams.selectedTab || 0;

		if (!angular.equals(this.account, {}) && !angular.equals(this.account, null)) {
			// this.edit(this.account);
		}
	}

	edit(account = {}) {
		state.go('account', {id: account});
	}

	findAndEdit({ data }) {
		accountService.find(data._id).then(data => this.edit(data));
	}

	getAccounts({ level }) {
		return accountService.builder
			.where('level', '=', level)
			.sort('full_name')
			.build()
			.then(data => this.data = data);
	}

	remove({ data }) {
		modalOptions.id = data._id;
		modalOptions.service = accountService;
		modal.warn(modalOptions);
	}

}
