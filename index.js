module.exports = function() {
	var package = require("./package.json");
	var plugin = {};
	var http;
	
	plugin.name = package["name"];
	plugin.version = package["version"];
	plugin.dependencies = [
		"cerus-promise"
	];

	plugin._init = function(cerus) {
		http = new (require("./lib/http"))(cerus);
	}

	plugin.http = function() {
		return http;
	}

	plugin.server = function() {
		return http.server();
	}

	return plugin;
}
