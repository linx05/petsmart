import angular from 'angular';
import storage from 'angular-storage';
import jwt from 'angular-jwt';

import ApiService from './api.service';
import AuthService from './auth.service';
import QueryBuilderService from './query-builder.service';
import ResourceService from './resource.service';
import SocketService from './socket.service';
import LanguageService from './language.service';
import HistoryService from './history.service';
import PaginationService from './pagination.service';
import ErrorHandlerService from './error-handler.service';
import PersistenceService from './persistence.service';
import CollectionsService from './collections.service';

const services = angular
	.module('app.services', [
		storage,
		jwt
	])
	.service({
		ApiService,
		AuthService,
		QueryBuilderService,
		ResourceService,
		SocketService,
		LanguageService,
		HistoryService,
		PaginationService,
		ErrorHandlerService,
		PersistenceService,
		CollectionsService,
	})
	.name;

export default services;
