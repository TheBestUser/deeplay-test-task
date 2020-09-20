"use strict";

const hostname = require("os").hostname();

module.exports = {
	nodeID: `worker-${hostname}`,
	logger: [
		{
			type: "Console",
			options: {
				level: "trace"
			}
		},
		{
			type: "File",
			options: {
				level: "info",
				folder: "/logs/moleculer",
				filename: "all-{date}.log",
				formatter: "{timestamp} {level} {nodeID}/{mod}: {msg}"
			}
		},
	],
	logLevel: "info",
	registry: {
		strategy: "RoundRobin",
		preferLocal: false,
	}
};
