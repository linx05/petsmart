export default class AccountService {

	constructor(ResourceService) {
		'ngInject';
		Object.assign(this, ResourceService.getInstance());
		this.setResource('users');
	}

	all({ level = '' }) {
		return this.builder
			.where('level', '=', level)
			.sort('full_name', '+')
			.build(params => this.api.httpGet('users/all?' + params))
			.then(data => data)
			.catch(this.api.requestFailed);
	}

	getAccountLevels() {
		return this.api.httpGet('users/levels')
			.then(data => data)
			.catch(this.api.requestFailed);
	}
}
