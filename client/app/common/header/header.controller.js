let translate, auth, state;
export default class HeaderController {

	constructor($translate, $state, AuthService) {
		'ngInject';
		state = $state;
		translate = $translate;
		auth = AuthService;
	}

	$onInit () {
		this.isAdmin = auth.isAdmin();
	}

	goTo(route) {
		state.go(route);
	}

	toggleSidebar() {
	}

}
