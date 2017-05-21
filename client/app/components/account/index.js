import angular from 'angular';
import AccountService from './account.service';
import AccountForm from './account-form';
import AccountEdit from './account-edit';
import AccountItem from './account-item';
import AccountList from './account-list';
import Account from './account.component';

const account = angular
.module('account', [
	AccountForm,
	AccountEdit,
	AccountItem,
	AccountList,
])
.service('AccountService', AccountService)
.component('account', Account)
.config(($stateProvider, $urlRouterProvider) => {
	'ngInject';
	$stateProvider
	.state('accounts', {
		url      : '/accounts/:id',
		component: 'account',
		params   : {
			id: {value: null, dynamic: true, squash: true},
		},
		data     : {
			requiresLogin: true,
			level        : ['admin']
		},
		resolve  : {
			data($stateParams, AccountService, AuthService) {
				'ngInject';
				if (AuthService.isUser()) {
					return AccountService.builder
					.sort('full_name')
					.build()
					.then(data => data);
				}
				return AccountService.builder
				.where('level', '=', $stateParams.lastTab || 'admin')
				.sort('full_name')
				.build()
				.then(data => data);
			},
			account($stateParams, AccountService) {
				'ngInject';
				if ($stateParams.id === null) {
					return null;
				}
				else if ($stateParams.id === 'add') {
					return {};
				}
				else {
					return AccountService.find($stateParams.id)
					.then(data => data);
				}
			},
			levels(AccountService, AuthService) {
				'ngInject';
				if (AuthService.isUser()) {
					return [];
				}
				return AccountService.getAccountLevels()
				.then(data => data);
			}
		}
	});
	$urlRouterProvider.otherwise('/home');
})
	.name;

export default account;
