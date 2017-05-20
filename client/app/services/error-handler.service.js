export default class ErrorHandlerService {

	constructor($translate) {
		'ngInject';
		this.$translate = $translate;
		this.errors = {
			arrived     : this.$translate.instant('global.error.arrived'),
			departed    : this.$translate.instant('global.error.departed'),
			unique      : this.$translate.instant('global.error.unique'),
			required    : this.$translate.instant('global.error.required'),
			unauthorized: this.$translate.instant('global.error.unauthorized'),
			unknown     : this.$translate.instant('global.error.unknown'),
		};
	}

	handle(error, component = '') {
		const data = error.data;
		const messages = [];

		if (data.name === 'CustomValidationError') {
			angular.forEach(data.errors, (value, key) => {
				const errorType = this.findErrorType(value);

				messages.push(this.errors[errorType]);
			});
		}
		else if (data.name === 'ValidationError') {
			angular.forEach(data.errors, (value, key) => {
				const field = this.$translate.instant(`${component}.${key}`);
				const errorType = this.findErrorType(value);

				messages.push(this.errors[errorType].replace('${field}', field));
			});
		}
		else {
			messages.push(this.errors.unauthorized);
		}

		return messages;
	}

	findErrorType(error) {
		const errorTypes = Object.keys(this.errors);
		let type = '';

		for (const e of errorTypes) {
			if (error.message.includes(e)) {
				type = e;
				break;
			}
		}

		return type;
	}

}
