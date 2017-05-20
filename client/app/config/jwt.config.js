export function JwtOptions ($httpProvider, jwtOptionsProvider, ENV_VARS) {
	'ngInject';
	jwtOptionsProvider.config({
		authPrefix : 'JWT ',
		whiteListedDomains: ['localhost', ENV_VARS.apiUrl],
		tokenGetter: ['AuthService', (AuthService) => {
			if (AuthService.getToken() && AuthService.isTokenExpired()) {
				AuthService.refresh()
					.catch(() => AuthService.logout());
			}
			return AuthService.getToken();
		}]
	});
	$httpProvider.interceptors.push('jwtInterceptor');
}
