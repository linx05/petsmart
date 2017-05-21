import controller from './account-form.controller';
import template from './account-form.html';

const AccountFormComponent = {
	bindings: {
		data: '<',
		event: '<',
		adminMode: '<',
		levels: '<',
		companies: '<',
		onSave: '&',
	},
	controller,
	template
};

export default AccountFormComponent;
