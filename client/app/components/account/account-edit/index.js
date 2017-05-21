import angular from 'angular';
import AccountEditComponent from './account-edit.component';

const accountEdit = angular
	.module('account.edit', [])
	.component('accountEdit', AccountEditComponent)
.config(($stateProvider, $urlRouterProvider) => {
	'ngInject';
	$stateProvider
	.state('sale', {
		url      : '/account/:id',
		component: 'accountEdit',
		params   : {
			id    : {value: null, squash: true},
			filter: {value: null, squash: true},
		},
		data     : {
			requiresLogin: true,
			level        : ['admin']
		},
		resolve  : {
			data($stateParams, AccountService) {
				'ngInject';
				return AccountService.find($stateParams.id)
				.then(data => data);
			}
		}
	});
	$urlRouterProvider.otherwise('/home');
})
	.name;

export default accountEdit;
