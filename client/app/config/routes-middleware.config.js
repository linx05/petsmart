export default function RoutesMiddleware($transitions, AuthService, HistoryService) {
	'ngInject';
	const auth   = AuthService;
	const $state = $transitions._router.stateService;
	const history = HistoryService;

	$state.defaultErrorHandler((error) => {
		// console.log(error);
	});

	$transitions.onSuccess({}, (transition) => {
	});

	$transitions.onStart({}, (transition) => {
		const state         = transition.to();
		const levels        = state.data.level;
		const requiresLogin = state.data.requiresLogin;
		const params        = transition.params();

		if (!transition.from().abstract) {
			history.push(transition.from(), transition.from().params);
		}

		if (!state) return redirectToHome();

		if (typeof homeMiddleWare()                       !== 'undefined') return;
		if (typeof requiresLoginMiddleware(requiresLogin) !== 'undefined') return;
		if (typeof levelsMiddleware(levels)               !== 'undefined') return;
		if (typeof modalComponentMiddleware(params)       !== 'undefined') return;

		function requiresLoginMiddleware(requiresLogin) {
			if ((requiresLogin && !auth.isLogged()) || (!requiresLogin && auth.isLogged())) {
				return redirectToHome();
			}
		}

		function levelsMiddleware(levels) {
			if (!levels) return true;

			if (!levels.includes(auth.getLoginLevel())) {
				return redirectToHome();
			}
		}

		function modalComponentMiddleware(params) {
			if (auth.isUser() && params.isModalOpen) {
				// ModalService.close();
				return redirectToHome();
			}
		}

		function homeMiddleWare() {
			if (state.name === 'home') {
				// return redirectToHome();
			}
		}
	});

	$transitions.onError({}, (transition) => {
		transition.promise
			.then(() => redirectToHome())
			.catch((error) => {
				// if (error.constructor.name !== 'Rejection') {
				if (error.status && error.status >= 400) {
					redirectToHome();
				}
			});
	});

	function getHome() {
		return auth.isLogged() ? 'home' : 'login';
	}

	function redirectToHome() {
		return $state.go(getHome());
	}
}
