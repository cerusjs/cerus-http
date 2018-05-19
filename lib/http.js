var http2 = require("http2");
var server = require("./server");

/**
 * @class http
 */
module.exports = class http {
	constructor(cerus) {
		this._settings = new settings();
		this._ssl = new ssl();
		this._cerus = cerus;
	}

	/**
	 * @function ssl
	 */
	ssl() {
		return this._ssl;
	}

	/**
	 * @function settings
	 */
	settings() {
		return this._settings;
	}

	/**
	 * @function server
	 */
	server() {
		return new server(this._settings, this._ssl, this._cerus);
	}

	/**
	 * @function errors
	 */
	errors() {
		return this._errors === undefined ? this._errors = new errors() : this._errors;
	}
}

/**
 * @class http
 * @id http.ssl
 */
class ssl {

}

/**
 * @class http
 * @id http.settings
 */
class settings {
	constructor(defaults = {}, update) {
		this._settings = Object.bind({}, defaults, {
			allowHTTP1: true,
			maxDeflateDynamicTableSize: "4Kib",
			maxSessionMemory: 10,
			maxHeaderListPairs: 128,
			maxOutstandingPings: 10,
			maxSendHeaderBlockLength: undefined,
			paddingStrategy: http2.constants.PADDING_STRATEGY_NONE,
			peerMaxConcurrentStreams: 100,
			selectPadding: undefined,
			headerTableSize: "4,096 octets",
			enablePush: true,
			initialWindowSize: "65,535 bytes",
			maxFrameSize: "16,384 bytes",
			maxConcurrentStreams: undefined,
			maxHeaderListSize: 65535
		});
		this._update = update;
	}

	/**
	 * This is the setter and getter for the allowhttp1 setting. With this setting you can change 
	 * if HTTP 1.x requests are accepted by the server. This means you can keep support for clients
	 * that might not use http/2. When this is set to false and a client tries to connect with the 
	 * incorrect protocol the server will emit an 'unknownProtocol' event. By default this is set 
	 * to true.
	 * @summary The setter/getter for the allowhttp1 setting.
	 * @param {Boolean} allowed If HTTP 1.x requests should be accepted by the server.
	 * @return {Boolean} If HTTP 1.x requests should be accepted by the server.
	 * @function allowhttp1
	 */
	allowhttp1(allowed) {
		if(typeof allowed === "boolean") {
			this._settings.allowHTTP1 = allowed;

			if(this._update) {
				this._update();
			}
		}

		return this._settings.allowHTTP1;
	}

	/**
	 * This is the setter and getter for the maxtablesize setting. With this setting you can set 
	 * the maximum dynamic table size when deflating header fields. This means this setting changes
	 * how big the table size when compressing the response headers is maximally allowed to be. By 
	 * default this is set to "4Kib".
	 * @summary The setter/getter for the maxtablesize setting.
	 * @param {String} max The maximum dynamic table size when deflating header fields.
	 * @return {String} The maximum dynamic table size when deflating header fields.
	 * @function maxtablesize
	 */
	maxtablesize(max) {
		if(typeof max === "string") {
			this._settings.maxDeflateDynamicTableSize = max;

			if(this._update) {
				this._update();
			}
		}

		return this._settings.maxDeflateDynamicTableSize;
	}

	/**
	 * This is the setter and getter for the maxsessionmem setting. With this setting you can set
	 * how much memory a Http2Session is allowed to use. The amount of memory is set in megabytes, 
	 * so a value of 10 means 10 megabytes. By default this is set to 10 and the minimal value is 
	 * 1.
	 * @summary The setter/getter for the mexsessionmem setting.
	 * @param {Number} max How much memory a Http2Session is allowed to use.
	 * @return {Number} How much memory a Http2Session is allowed to use.
	 * @function maxsessionmem
	 */
	maxsessionmem(max) {
		if(typeof max === "number") {
			this._settings.maxSessionMemory = max;

			if(this._update) {
				this._update();
			}
		}

		return this._settings.maxSessionMemory;
	}

	/**
	 * This is the setter and getter for the maxheaderpairs setting. With this setting you can 
	 * change the maximum amount of header entries. This means you change how much pairs are 
	 * allowed to be in header list. By default this is set to 128 and the minimal value is 4.
	 * @summary The setter/getter for the maxheaderpairs setting.
	 * @param {Number} max The maximum amount of header entries.
	 * @return {Number} The maximum amount of header entries.
	 * @function maxheaderpairs
	 */
	maxheaderpairs(max) {
		if(typeof max === "number") {
			this._settings.maxHeaderListPairs = max;

			if(this._update) {
				this._update();
			}
		}

		return this._settings.maxHeaderListPairs;
	}

	/**
	 * This is the setter and getter for the maxopenpings setting. With this setting you can set
	 * the maximum number of outstanding, unacknowledged pings. When this limit is exeeded the 
	 * server will stop accepting ping requests from unacknowledged, meaning unknown, clients.
	 * By default this value is set to 10.
	 * @summary The setter/getter for the maxopenpings setting.
	 * @param {Number} max The maximum number of outstanding, unacknowledged pings.
	 * @return {Number} The maximum number of outstanding, unacknowledged pings.
	 * @function maxopenpings
	 */
	maxopenpings(max) {
		if(typeof max === "number") {
			this._settings.maxOutstandingPings = max;

			if(this._update) {
				this._update();
			}
		}

		return this._settings.maxOutstandingPings;
	}

	/**
	 * This is the setter and getter for the maxheaderlength setting. With this setting you can 
	 * change the maximum size for the compressed block of headers. The block of headers is all of 
	 * the headers combined. HTTP2 than compresses that block of headers. By default the maximum
	 * amount for this is infinite, but can be set using this setting.
	 * @summary The setter/getter for the maxheaderlength setting.
	 * @param {Number} max The maximum size for the compressed block of headers.
	 * @return {Number} The maximum size for the compressed block of headers.
	 * @function maxheaderlength
	 */
	maxheaderlength(max) {
		if(typeof max === "number") {
			this._settings.maxSendHeaderBlockLength = max;

			if(this._update) {
				this._update();
			}
		}

		return this._settings.maxSendHeaderBlockLength;
	}

	/**
	 * This is the setter and getter for the paddingstrategy setting. With this setting you change 
	 * what strategy is used for determining the amount of padding to use for the compression. The 
	 * default is PADDING_STRATEGY_NONE, meaning that no padding will be applied. You can also use
	 * PADDING_STRATEGY_MAX to use the maximum amount of padding; PADDING_STRATEGY_CALLBACK to use
	 * the selectpadding setting for determining the amount of padding; PADDING_STRATEGY_ALIGNED to
	 * use the exact amount of padding so that the data will be rounded to the multiple 8.
	 * @summary The setter/getter for the paddingstrategy setting.
	 * @param {Enum} strategy What strategy is used for determining the amount of padding to use 
	 * for the compression.
	 * @return {Enum} What strategy is used for determining the amount of padding to use for the 
	 * compression.
	 * @function paddingstrategy
	 */
	paddingstrategy(strategy) {
		if(typeof strategy === "number") {
			this._settings.paddingStrategy = strategy;

			if(this._update) {
				this._update();
			}
		}

		return this._settings.paddingStrategy;
	}

	/**
	 * This is the setter and getter for the maxstreams setting. With this setting you can set the 
	 * maximum number of concurrent streams for the remote client, unless this setting is changed 
	 * by the client. This is send in the SETTINGS part of the response. By default this is set to 
	 * 100. 
	 * @summary The setter/getter for the maxstreams setting.
	 * @param {Number} max The maximum number of concurrent streams for the remote client.
	 * @return {Number} The maximum number of concurrent streams for the remote client.
	 * @function maxstreams
	 */
	maxpeerstreams(max) {
		if(typeof max === "number") {
			this._settings.peerMaxConcurrentStreams = max;

			if(this._update) {
				this._update();
			}
		}

		return this._settings.peerMaxConcurrentStreams;
	}

	/**
	 * This is the setter and getter for the selectpadding setting. With this setting you can 
	 * change the callback function used to determine the padding, the paddingstrategy setting has
	 * PADDING_STRATEGY_CALLBACK as value. By default this function is undefined and the 
	 * paddingstrategy is set to PADDING_STRATEGY_NONE.
	 * @summary The setter/getter for the selectpadding setting.
	 * @param {Function} func The callback function used to determine the padding.
	 * @return {Function} The callback function used to determine the padding.
	 * @function selectpadding
	 */
	selectpadding(func) {
		if(typeof func === "number") {
			this._settings.selectPadding = func;

			if(this._update) {
				this._update();
			}
		}

		return this._settings.selectPadding;
	}

	/**
	 * This is the setter and getter for the headertablesize setting. With this setting you can set
	 * the maximum number of bytes used for header compression. The default value is 4,096 bytes, 
	 * the minimal value is 0 bytes and the maximum value is 2^32-1.
	 * @summary The setter/getter for the headertablesize setting.
	 * @param {String} size The maximum number of bytes used for header compression.
	 * @return {String} The maximum number of bytes used for header compression.
	 * @function headertablesize
	 */
	headertablesize(size) {
		if(typeof size === "string") {
			this._settings.headerTableSize = size;

			if(this._update) {
				this._update();
			}
		}

		return this._settings.headerTableSize;
	}

	/**
	 * This is the setter and getter for the enablepush setting. With this setting you can change 
	 * if the server is enabled to send push responses. These are used to send files to the client 
	 * the server knows it will need. By default this is set to true.
	 * @summary The setter/getter for the enablepush setting.
	 * @param {Boolean} enable If the server is enabled to send push responses.
	 * @return {Boolean} If the server is enabled to send push responses.
	 * @function enablepush
	 */
	enablepush(enable) {
		if(typeof enable === "boolean") {
			this._settings.enablePush = enable;

			if(this._update) {
				this._update();
			}
		}

		return this._settings.enablePush;
	}

	/**
	 * This is the setter and getter for the windowsize setting. With this setting you can set the
	 * senders initial window size for stream-level flow control. The default value is 65,535 
	 * bytes, the minimal value is 0 bytes and the maximum value is 2^32-1.
	 * @summary The setter/getter for the windowsize setting.
	 * @param {String} size The senders initial window size for stream-level flow control.
	 * @return {String} The senders initial window size for stream-level flow control.
	 * @function windowsize
	 */
	windowsize(size) {
		if(typeof size === "string") {
			this._settings.initialWindowSize = size;

			if(this._update) {
				this._update();
			}
		}

		return this._settings.initialWindowSize;
	}

	/**
	 * This is the setter and getter for the maxframesize setting. With this setting you can change
	 * the size of the largest frame payload. This is the maximum size of a frame. This is a part 
	 * of the response.The default value is 16,384 bytes, the minimal value is 16,384 bytes and the
	 * maximum value is 2^24-1.
	 * @summary The setter/getter for the maxframesize setting.
	 * @param {String} max The size of the largest frame payload.
	 * @return {String} The size of the largest frame payload.
	 * @function maxframesize
	 */
	maxframesize(max) {
		if(typeof max === "string") {
			this._settings.maxFrameSize = max;

			if(this._update) {
				this._update();
			}
		}

		return this._settings.maxFrameSize;
	}

	/**
	 * This is the setter and getter for the maxstreams setting. With this setting you can set the
	 * maximum amount of concurrent streams that are permitted by server. This is the server's 
	 * limit, not the client limit. The minimal value is 0 and the maximum value is 2^31-1.
	 * @summary The setter/getter for the maxstreams setting.
	 * @param {String} max The maximum amount of concurrent streams that are permitted by server.
	 * @return {String} The maximum amount of concurrent streams that are permitted by server.
	 * @function maxstreams
	 */
	maxstreams(max) {
		if(typeof max === "string") {
			this._settings.maxConcurrentStreams = max;

			if(this._update) {
				this._update();
			}
		}

		return this._settings.maxConcurrentStreams;
	}

	/**
	 * This is the setter and getter for the maxheaderlist setting. With this setting you can 
	 * change the maximum amount of headers the server will accept. If the limit is exceeded it
	 * won't accept the request. The default value is 65535 bytes, the minimal value is 0 bytes and
	 * the maximum value is 2^32-1.
	 * @summary The setter/getter for the maxheaderlist setting.
	 * @param {String} max The maximum amount of headers the server will accept.
	 * @return {String} The maximum amount of headers the server will accept.
	 * @function maxheaderlist
	 */
	maxheaderlist(max) {
		if(typeof max === "number") {
			this._settings.maxHeaderListSize = max;

			if(this._update) {
				this._update();
			}
		}

		return this._settings.maxHeaderListSize;
	}
}

/**
 * @class errors
 * @id http.errors
 */
class errors {
	/**
	 * @function no
	 */
	no() {
		return http2.constants.NGHTTP2_NO_ERROR;
	}
	
	/**
	 * @function protocol
	 */
	protocol() {
		return http2.constants.NGHTTP2_PROTOCOL_ERROR;
	}
	
	/**
	 * @function internal
	 */
	internal() {
		return http2.constants.NGHTTP2_INTERNAL_ERROR;
	}
	
	/**
	 * @function flowcontrol
	 */
	flowcontrol() {
		return http2.constants.NGHTTP2_FLOW_CONTROL_ERROR;
	}
	
	/**
	 * @function timeout
	 */
	timeout() {
		return http2.constants.NGHTTP2_SETTINGS_TIMEOUT;
	}
	
	/**
	 * @function streamclosed
	 */
	streamclosed() {
		return http2.constants.NGHTTP2_STREAM_CLOSED;
	}
	
	/**
	 * @function framesize
	 */
	framesize() {
		return http2.constants.NGHTTP2_FRAME_SIZE_ERROR;
	}
	
	/**
	 * @function refusedstream
	 */
	refusedstream() {
		return http2.constants.NGHTTP2_REFUSED_STREAM;
	}
	
	/**
	 * @function cancel
	 */
	cancel() {
		return http2.constants.NGHTTP2_CANCEL;
	}
	
	/**
	 * @function compression
	 */
	compression() {
		return http2.constants.NGHTTP2_COMPRESSION_ERROR;
	}
	
	/**
	 * @function connect
	 */
	connect() {
		return http2.constants.NGHTTP2_CONNECT_ERROR;
	}
	
	/**
	 * @function enhancecalm
	 */
	enhancecalm() {
		return http2.constants.NGHTTP2_ENHANCE_YOUR_CALM;
	}
	
	/**
	 * @function badsecurity
	 */
	badsecurity() {
		return http2.constants.NGHTTP2_INADEQUATE_SECURITY;
	}
	
	/**
	 * @function badprotocol
	 */
	badprotocol() {
		return http2.constants.NGHTTP2_HTTP_1_1_REQUIRED;
	}
}