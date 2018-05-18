var http2 = require("http2");
var http = require("./http");

module.exports = class server {
	constructor(ssl, settings, cerus) {
		this._ssl = new ssl(ssl);
		this._settings = new settings(settings, this.update);
		this._callback = undefined;
		this._port = 80;
		this._cerus = cerus;

		this.update();
	}

	port(port) {
		if(typeof port === "number") {
			this._port = port;
		}

		return this._port;
	}

	events() {
		return this._cerus.promise(function(event) {
			this._server.on("checkContinue", function(req, res) {
				event("checkContinue", req, res);
			});

			this._server.on("request", function(req, res) {
				event("request", req, res);
			});

			this._server.on("session", function() {
				event("session");
			});

			this._server.on("sessionError", function() {
				event("sessionError");
			});

			this._server.on("stream", function() {
				event("stream");
			});

			this._server.on("timeout", function() {
				event("timeout");
			});

			this._server.on("unknownProtocol", function() {
				event("unknownProtocol");
			});

			this._server.on("OCSPRequest", function(cert, issuer, callback) {
				event("OCSPRequest", cert, issuer, callback);
			});

			this._server.on("resumeSession", function(session, callback) {
				event("resumeSession", session, callback);
			});

			this._server.on("secureConnection", function(socket) {
				event("secureConnection", session);
			});

			this._server.on("tlsClientError", function(exception, socket) {
				event("tlsClientError", exception, socket);
			});
		}.bind(this));
	}

	ssl() {
		return this._ssl;
	}

	settings() {
		return this._settings;
	}

	address() {
		this._address === undefined ? this._address = new address(this._server.address) : this._address;
	}

	listen(port) {
		if(this.listening()) {
			throw new Error("the server was already listening");
		}

		if(port !== undefined && typeof port !== "number") {
			throw new TypeError("the argument port must be a number");
		}

		return this._cerus.promise(function(event) {
			this._server.listen(port || this._port, function() {
				event("started");
			});
		}.bind(this));
	}

	start(port) {
		return this.listen(port);
	}

	close() {
		if(!this.listening()) {
			throw new Error("the server never started listening");
		}

		return this._cerus.promise(function(event) {
			this._server.close(function() {
				event("stopped");
			});
		}.bind(this));
	}

	end() {
		return this.close();
	}

	callback(callback) {
		if(typeof callback === "function") {
			this._callback = callback;
		}

		return this._callback;
	}

	listening() {
		return this._listening;
	}

	update() {
		if(this._listening) {
			throw new Error("cannot update the settings if the server is listening"); 
		}

		if(this._ssl._ssl.on) {
			this._server = http2.createSecureServer(Object.concat({}, this._ssl._map, this._settings._map), function() {
				if(typeof this._callback === "function") {
					this.callback(req, res);
				}
			}.bind(this));
		}
		else {
			this._server = http2.createServer(this._settings._map, function() {
				if(typeof this._callback === "function") {
					this.callback(req, res);
				}
			}.bind(this));
		}
	}
}

class address {
	constructor(address) {
		this._address = address;
	}

	address() {
		return this._address.address;
	}

	port() {
		return this._address.port;
	}

	family() {
		return this._address.family;
	}
}