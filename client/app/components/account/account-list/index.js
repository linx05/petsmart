import angular from 'angular';
import AccountListComponent from './account-list.component';

const accountList = angular
	.module('account.list', [])
	.component('accountList', AccountListComponent)
	.name;

export default accountList;