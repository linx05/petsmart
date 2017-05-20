export default class SidebarController {

	constructor ($state) {
		'ngInject';
		this.state      = $state;
	}

	$onInit () {
		this.menus = [
			{name: 'global.menu.accounts', icon: 'account', state: 'accounts'},
			{name: 'global.menu.clients', icon: 'business', state: 'clients'},
			{name: 'global.menu.products', icon: 'products',state: 'products'},
			{name: 'global.menu.entry', icon: 'store',      state: 'movements'},
			{name: 'global.menu.sales', icon: 'shopping',   state: 'sales'}
		];

		this.showMenus();
	}

	$onChanges (changes) {
		if (changes.user) {
			this.user = Object.assign({}, this.user);
		}

		if (changes.states) {
			this.states = Object.assign([], this.states);
		}
	}

	showMenus () {
		let states = this.states.filter((state) => {
			if (state.data && state.data.level) {
				return state.data.level.includes(this.user.level);
			}
			return false;
		});

		states = states.map(state => state.name);

		this.menus = this.menus.filter(menu => states.includes(menu.state));
	}

	openSaleModal () {
		this.state.go('sale');
	}

	toggleSidebar () {
	}

	toggleSidebarIfScreenIsSmall () {
		this.toggleSidebar();
	}

}
