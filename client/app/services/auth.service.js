const routes = {
	logout : 'auth/logout',
	refresh: 'auth/refresh',
	token  : 'auth/token',
};

export default class AuthService {

	constructor($location, ApiService, jwtHelper, store) {
		'ngInject';
		this.$location = $location;
		this.apiService   = ApiService;
		this.jwt          = jwtHelper;
		this.localStorage = store;
	}

	getAuthHeader() {
		return 'JWT ' + this.getToken();
	}

	getCompany() {
		const token = this.getToken();
		return token ? this.jwt.decodeToken(token).company : '';
	}

	getDecodedToken() {
		const token = this.getToken();
		return token ? this.jwt.decodeToken(token) : null;
	}

	getId() {
		const token = this.getToken();
		return token ? this.jwt.decodeToken(token).id : null;
	}

	getLanguage() {
		const token = this.getToken();
		return token ? this.jwt.decodeToken(token).language : 'spanish';
	}

	getLoginLevel() {
		const token = this.getToken();
		return token ? this.jwt.decodeToken(token).level : null;
	}

	getLoginName() {
		const token = this.getToken();
		return token ? this.jwt.decodeToken(token).name : null;
	}

	getToken() {
		return this.getTokenFromLocalStorage() || this.getTokenFromUrl();
	}

	getTokenFromLocalStorage() {
		return this.localStorage.get('jwt');
	}

	getTokenFromUrl() {
		return this.$location.search().jwt;
	}

	isAdmin() {
		return this.getLoginLevel() === 'admin';
	}

	isClientTracker() {
		return this.getLoginLevel() === 'clientTracker';
	}

	isEmployee() {
		return this.getLoginLevel() === 'employee';
	}

	isLogged() {
		return !!this.getToken();
	}

	isUser() {
		return this.getLoginLevel() === 'user';
	}

	isTokenExpired() {
		const token = this.getToken();
		return token ? this.jwt.isTokenExpired(token) : true;
	}

	login(name, password) {
		return this.apiService.httpPost(routes.token, { login: name, password: password })
			.then((data) => this.localStorage.set('jwt', data.token))
			.catch(this.apiService.requestFailed);
	}

	logout() {
		return this.apiService.httpGet(routes.logout)
			.finally((data) => this.localStorage.remove('jwt'));
	}

	refresh() {
		return this.apiService.httpGet(routes.refresh)
			.then((data) => this.localStorage.set('jwt', data.token))
			.catch(this.apiService.requestFailed);
	}

}
