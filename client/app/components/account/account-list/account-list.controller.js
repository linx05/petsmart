export default class AccountListController {

	constructor() {
		'ngInject';
	}

	$onChanges(changes) {
		if (changes.data) {
			this.data = Object.assign({}, this.data);
		}
	}

	selectItem($event) {
		this.onSelectItem({ $event });
	}

	deleteItem($event) {
		this.onDeleteItem({ $event });
	}

}