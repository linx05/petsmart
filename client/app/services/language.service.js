export default class LanguageService {

	constructor($translate, AuthService, store) {
		'ngInject';
		this.$translate   = $translate;
		this.auth         = AuthService;
		this.localStorage = store;

		this.languages = {
			english: 'enUS',
			spanish: 'esMX',
		};
	}

	setLanguage(lang) {
		const language = lang || this.localStorage.get('lang') || this.auth.getLanguage();

		this.$translate.use(this.languages[language]);

		this.localStorage.set('lang', language);
	}

}
