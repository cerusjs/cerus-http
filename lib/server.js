module.exports = class server {
	constructor() {
		
	}

	on() {

	}

	ssl() {
		return this._ssl;
	}

	settings() {
		return this._settings;
	}

	address() {
		this._address === undefined ? this._address = new address() : this._address;
	}

	listen() {

	}

	close() {

	}

	callback() {

	}

	listening() {

	}
}

class address {
	constructor(address) {
		this._address = address;
	}
}