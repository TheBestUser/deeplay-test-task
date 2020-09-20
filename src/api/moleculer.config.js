"use strict";

const hostname = require("os").hostname();

module.exports = {
	nodeID: `api-${hostname}`,
	logger: true,
	logLevel: "info",
};
