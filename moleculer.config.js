"use strict";

const os = require("os");
const HealthMiddleware = require("./middlewares/health-check.middleware");

module.exports = {
	nodeID: os.hostname().toLowerCase() + "-" + process.pid,
	logger: true,
	logLevel: "info",
	registry: {
		strategy: "RoundRobin",
		preferLocal: false,
	},
	middlewares: [
		process.env.HEALTH_CHECK ? HealthMiddleware() : null,
	],
};
