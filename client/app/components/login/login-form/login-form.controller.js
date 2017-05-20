export default class LoginFormController {

	$onInit() {
		this.loading = false;
	}
	
	$onChanges(changes) {
		if (changes.data) {
			this.data = Object.assign({}, this.data);
			this.loading = false;
		}
	}

	onSubmit() {
		if (!this.data.name || !this.data.password) return;

		this.loading = true;

		this.onLogin({
			$event: { data: this.data }
		});
	}

}