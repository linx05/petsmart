let account, client, errorHandler;

export default class AccountEditController {

	constructor (AccountService, ErrorHandlerService) {
		'ngInject';
		account = AccountService;
		errorHandler = ErrorHandlerService;
	}

	$onInit () {
		this.errors = [];
		account.getAccountLevels().then(data => this.levels = data);

	}

	$onChanges (changes) {
		if (changes.data) {
			this.data = Object.assign({}, this.data);
		}

		if (changes.event) {
			// If an event occurs must not be reassigned here
			// because will cause a duplication of the said event
			// this.event = Object.assign({}, this.event);
		}
	}

	createRequest (data) {
		let request = null;

		const accountData = {
			email: data.email,
			level: data.level,
			password: data.password,
			settings: {
				language: 'spanish',
				notifications: data.notifications
			}
		};

		if (data.level === 'user' || data.level === 'clientTracker') {
			accountData.company = data.company;
			// accountData.customer = {
			// 	phone: data.phone,
			// 	rfc: data.rfc,
			// };
		}

		if (data._id) {
			accountData.full_name = data.name;
			request = account.edit(data._id, accountData);
		} else {
			accountData.name = data.name;
			request = account.add(accountData);
		}

		return request;
	}

	save ({data}) {
		const req = this.createRequest(data);

		this.errors = [];
		this.onToggle();

		return req
			.then(data => this.onAccept({$event: {data}}))
			.catch(error => this.errors = errorHandler.handle(error, 'account.form'))
			.finally(() => this.onToggle());
	}

}
