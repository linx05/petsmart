import controller from './account.controller';
import template from './account.html';

const AccountComponent = {
	bindings: {
		account: '<',
		data: '<',
		levels: '<',
	},
	controller,
	template
};

export default AccountComponent;
