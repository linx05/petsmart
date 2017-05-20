import angular from 'angular';
import LoginComponent from './login.component';
import LoginForm from './login-form/index';
import './login.css';

const login = angular
	.module('login', [LoginForm])
	.component('login', LoginComponent)
	.config(($stateProvider, $urlRouterProvider) => {
		'ngInject';
		$stateProvider
			.state('login', {
				url: '/login',
				component: 'login',
				params: { error: null },
				data: { requiresLogin: false },
		});
		$urlRouterProvider.otherwise('/login');
	})
	.name;

export default login;
