import angular from 'angular';
import SidebarComponent from './sidebar.component';
import './sidebar.css';

const sidebar = angular
	.module('sidebar', [])
	.component('appSidebar', SidebarComponent)
	.name;

export default sidebar;