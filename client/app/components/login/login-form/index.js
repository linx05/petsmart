import angular from 'angular';

import LoginFormComponent from './login-form.component';

const loginForm = angular
	.module('login.form', [])
	.component('loginForm', LoginFormComponent)
	.name;

export default loginForm;