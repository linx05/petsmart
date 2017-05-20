export default function Internationalization($translateProvider) {
	'ngInject';
	$translateProvider.useStaticFilesLoader({
		prefix: '../assets/lang/',
		suffix: '.json'
	});
	$translateProvider.preferredLanguage('esMX');
	$translateProvider.useSanitizeValueStrategy('sanitizeParameters');
}
