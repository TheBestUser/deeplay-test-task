"use strict";

const hostname = require("os").hostname();

module.exports = {
	namespace: "deeplay",
	nodeID: `worker-${hostname}`,
	logger: [
		{ type: "Console" },
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
	transporter: {
		type: "TCP",
		options: {
		}
	},
	hotReload: true
};
