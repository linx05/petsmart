let state, transitions, auth, lang;

export default class AppController {

	constructor($state, $transitions, AuthService, LanguageService) {
		'ngInject';
		state       = $state;
		transitions = $transitions;
		auth        = AuthService;
		lang        = LanguageService;
	}

	$onInit() {
		this.isLogged = auth.isLogged();
		this.states = state.get();
		this.user = auth.getDecodedToken();

		transitions.onSuccess({}, (transition) => {
			this.isLogged = auth.isLogged();
			this.user = auth.getDecodedToken();
		});

		lang.setLanguage();
	}

	logout() {
		return auth.logout()
			.finally(() => state.go('login'));
	}

}
