import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Login from './login';
let componentModule = angular.module('app.components', [
	Home,
	About,
	Login,
])

	.name;

export default componentModule;
