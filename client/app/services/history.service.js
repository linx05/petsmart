export default class HistoryService {

	constructor($state, $rootScope) {
		'ngInject';
		this.state = $state;
		this.root = $rootScope;
		this.history = [];
	}

	push(state, params) {
		this.history.push({ state: state, params: params });
	}

	all() {
		return this.history;
	}
	go(step) {
		let prev = this.previous(step || -1);
		return this.state.go(prev.state, prev.state.params);
	}

	previous(step) {
		return this.history[this.history.length - Math.abs(step || 1)];
	}

	back() {
		return this.go(-1);
	}

}
