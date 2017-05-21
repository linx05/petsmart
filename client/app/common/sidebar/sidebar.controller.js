export default class SidebarController {

	constructor ($state) {
		'ngInject';
		this.state      = $state;
	}

	$onInit () {
	}

	$onChanges (changes) {
		if (changes.user) {
			this.user = Object.assign({}, this.user);
		}

		if (changes.states) {
			this.states = Object.assign([], this.states);
		}
	}

	toggleSidebar () {
	}

	toggleSidebarIfScreenIsSmall () {
		this.toggleSidebar();
	}

}
