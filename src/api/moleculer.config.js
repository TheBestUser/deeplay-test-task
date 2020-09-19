"use strict";

const hostname = require("os").hostname();

module.exports = {
	namespace: "deeplay",
	nodeID: `api-${hostname}`,
	logger: true,
	logLevel: "info",
};
