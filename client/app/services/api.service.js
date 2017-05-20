let ctrl;

export default class ApiService {

	constructor($http, $q, ENV_VARS) {
		'ngInject';
		ctrl       = this;
		ctrl.$http = $http;
		ctrl.$q    = $q;
		ctrl.api   = ENV_VARS.apiUrl + '/api/';
		// ctrl.toast = ToastService;
	}

	httpExecute(urlResource, method, data = null, hideLoading = false) {
		// if(!hideLoading) ctrl.toast.showLoading(300);

		return ctrl.$http({
				url: ctrl.api + urlResource,
				method: method,
				data: data,
			})
			.then((response) => {
				if (method !== 'GET' && !urlResource.includes('auth')) {
					// ctrl.toast.success();
				}
				return response.data;
			})
			.catch(ctrl.requestFailed)
			.finally(() => {
				if (!hideLoading) ctrl.toast.hideLoading();
			});
	}

	httpGet(url, hideLoading) {
		return ctrl.httpExecute(url, 'GET', null, hideLoading);
	}

	httpPost(url, data) {
		return ctrl.httpExecute(url, 'POST', data);
	}

	httpPut(url, data) {
		return ctrl.httpExecute(url, 'PUT', data);
	}

	httpDelete(url) {
		return ctrl.httpExecute(url, 'DELETE');
	}

	requestComplete(response) {
		return response.data;
	}

	requestFailed(error) {
		return ctrl.$q.reject(error);
	}

}
