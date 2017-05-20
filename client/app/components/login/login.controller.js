let state, auth, lang;

export default class LoginController {

	constructor($state, AuthService, LanguageService) {
		'ngInject';
		state = $state;
		auth  = AuthService;
		lang  = LanguageService;
	}

	$onInit() {
		this.credentials = null;
		this.error       = false;
	}

	login({ data }) {
		return auth.login(data.name, data.password)
			.then((response) => {
				lang.setLanguage(auth.getLanguage());
				state.go('home');
			})
			.catch((error) => {
				this.credentials = { name: data.name };
				this.error = true;
			});
	}

}
