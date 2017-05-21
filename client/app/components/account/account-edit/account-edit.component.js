import controller from './account-edit.controller';
import template from './account-edit.html';

const AccountEditComponent = {
	bindings: {
		data: '<',
	},
	controller,
	template
};

export default AccountEditComponent;
