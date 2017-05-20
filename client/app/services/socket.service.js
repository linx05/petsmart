export default class SocketService {

	constructor(AuthService, socketFactory, ENV_VARS) {
		'ngInject';
		this.auth      = AuthService;
		this.factory   = socketFactory;
		this.serverUrl = ENV_VARS.apiUrl + '/';
		this.ioSocket  = {};
	}

	getSocket() {
		if (!this.ioSocket || !this.ioSocket.connected) {
			this.ioSocket = io.connect(this.serverUrl, { query: `token=${this.auth.getToken()}` });
		}
		return this.factory({ ioSocket: this.ioSocket });
	}

}
