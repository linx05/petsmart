export default class PersistenceService {

	constructor(AuthService, store) {
		'ngInject';
		this.auth = AuthService;
		this.store = store;
	}

	get(key) {
		return angular.fromJson(this.store.get(key + this.auth.getId()));
	}

	set(key, value) {
		this.store.set(key + this.auth.getId(), angular.toJson(value));
	}

}
