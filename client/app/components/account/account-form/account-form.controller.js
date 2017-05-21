let form;

export default class AccountFormController {

	constructor() {
		'ngInject';
	}

	$onInit() {
		this.languages = [
			{ id: 'english' },
			{ id: 'spanish' },
		];
	}

	$onChanges(changes) {
		if (changes.data) {
			this.data = Object.assign({}, this.data);

			this.data.name = this.data.full_name;
			this.data.settings = Object.assign({}, this.data.settings);
			this.data.language = this.data.settings.language || 'english';
			this.data.notifications = this.data.settings.notifications || false;

			if (angular.isUndefined(this.data.active)){
				this.data.active = true;
			}
		}

		if (changes.event) {
			this.event = Object.assign({}, this.event);
			if (this.event.event === 'OK') this.onSubmit();
		}

		if (changes.levels) {
			this.userLevels = Object.assign([], this.levels).map((level) => {
				return { id: level };
			});
		}

		if (changes.companies) {
			this.companies = Object.assign([], this.companies);
		}
	}

	onSubmit() {
		if (form.$invalid) return form.$setSubmitted();
		this.onSave({
			$event: { data: this.data }
		});
	}

	setForm(f) {
		form = f;
	}

}
