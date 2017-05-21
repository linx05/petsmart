import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Login from './login';
import Account from './account';

let componentModule = angular.module('app.components', [
	Home,
	About,
	Login,
	Account,
])

	.name;

export default componentModule;
