var http2 = require("http2");

module.exports = class http {
	constructor() {

	}

	ssl() {

	}

	settings() {

	}

	server() {

	}

	errors() {
		return this._errors === undefined ? this._errors = new errors() : this._errors;
	}
}

class ssl {

}

class settings {

}

class errors {
	no() {
		return http2.constants.NGHTTP2_NO_ERROR;
	}

	protocol() {
		return http2.constants.NGHTTP2_PROTOCOL_ERROR;
	}

	internal() {
		return http2.constants.NGHTTP2_INTERNAL_ERROR;
	}

	flowcontrol() {
		return http2.constants.NGHTTP2_FLOW_CONTROL_ERROR;
	}

	timeout() {
		return http2.constants.NGHTTP2_SETTINGS_TIMEOUT;
	}

	streamclosed() {
		return http2.constants.NGHTTP2_STREAM_CLOSED;
	}

	framesize() {
		return http2.constants.NGHTTP2_FRAME_SIZE_ERROR;
	}

	refusedstream() {
		return http2.constants.NGHTTP2_REFUSED_STREAM;
	}

	cancel() {
		return http2.constants.NGHTTP2_CANCEL;
	}

	compression() {
		return http2.constants.NGHTTP2_COMPRESSION_ERROR;
	}

	connect() {
		return http2.constants.NGHTTP2_CONNECT_ERROR;
	}

	enhancecalm() {
		return http2.constants.NGHTTP2_ENHANCE_YOUR_CALM;
	}

	badsecurity() {
		return http2.constants.NGHTTP2_INADEQUATE_SECURITY;
	}

	badprotocol() {
		return http2.constants.NGHTTP2_HTTP_1_1_REQUIRED;
	}
}