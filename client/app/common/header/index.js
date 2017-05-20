import angular from 'angular';
import HeaderComponent from './header.component';
import './header.css';

const header = angular
	.module('header', [])
	.component('appHeader', HeaderComponent)
	.name;

export default header;
