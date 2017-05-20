import controller from './sidebar.controller';
import template from './sidebar.html';

const SidebarComponent = {
	bindings: {
		onLogout: '&',
		states: '<',
		user: '<',
	},
	controller,
	template,
	transclude: true
};

export default SidebarComponent;
