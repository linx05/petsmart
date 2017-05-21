import controller from './account-list.controller';
import template from './account-list.html';

const AccountListComponent = {
	bindings: {
		data: '<',
		adminMode: '<',
		onSelectItem: '&',
		onDeleteItem: '&',
	},
	controller,
	template
};

export default AccountListComponent;
