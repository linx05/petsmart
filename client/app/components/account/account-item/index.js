import angular from 'angular';
import AccountItemComponent from './account-item.component';

const accountItem = angular
	.module('account.item', [])
	.component('accountItem', AccountItemComponent)
	.name;

export default accountItem;