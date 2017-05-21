import angular from 'angular';
import AccountFormComponent from './account-form.component';

const accountForm = angular
	.module('account.form', [])
	.component('accountForm', AccountFormComponent)
	.name;

export default accountForm;