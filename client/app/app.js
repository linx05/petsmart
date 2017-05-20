import angular from 'angular';
import uiRouter from 'angular-ui-router';
import translate from 'angular-translate';
import translateStatic from 'angular-translate-loader-static-files';
import 'normalize.css';

import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import Services from './services/services';
import './app.config';

import Internationalization from './config/internationalization.config';
import {JwtOptions} from './config/jwt.config';
import RoutesMiddleware from './config/routes-middleware.config';
import locationConfig from './config/location.config';

const app = angular.module('app', [
	uiRouter,
	translate,
	Common,
	Components,
	Services,
])
.config(($locationProvider) => {
	"ngInject";
	// @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
	// #how-to-configure-your-server-to-work-with-html5mode
	// $locationProvider.html5Mode(true).hashPrefix('!');
})
.component('app', AppComponent)
.config(Internationalization)
.config(JwtOptions)
.config(locationConfig)
.run(RoutesMiddleware);

document.addEventListener('DOMContentLoaded', () => angular.bootstrap(document, ['app']), {
	strictDi: true
});

export default app;
