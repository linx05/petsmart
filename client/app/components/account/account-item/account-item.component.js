import controller from './account-item.controller';
import template from './account-item.html';

const AccountItemComponent = {
	bindings: {
		data: '<',
		adminMode: '<',
		onSelect: '&',
		onDelete: '&',
	},
	controller,
	template
};

export default AccountItemComponent;
