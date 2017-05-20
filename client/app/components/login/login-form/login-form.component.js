import controller from './login-form.controller';
import template from './login-form.html';

const LoginFormComponent = {
	bindings: {
		data: '<',
		onLogin: '&'
	},
	controller,
	template
};

export default LoginFormComponent;
