"use strict";

module.exports = {
	logger: [
		{
			type: "Console",
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

	requestTimeout: 10 * 1000,
	retryPolicy: {
		enabled: true,
		retries: 5,
		delay: 100,
		maxDelay: 2000,
		factor: 2,
		check: err => err && !!err.retryable
	},
	maxCallLevel: 100,
	heartbeatInterval: 10,
	heartbeatTimeout: 30,
	tracking: {
		enabled: true,
		shutdownTimeout: 5000,
	},

	disableBalancer: false,
	registry: {
		strategy: "Latency",
		preferLocal: false
	},
	circuitBreaker: {
		enabled: false,
		threshold: 0.5,
		minRequestCount: 20,
		windowTime: 60,
		halfOpenTime: 10 * 1000,
		check: err => err && err.code >= 500
	},

	bulkhead: {
		enabled: false,
		concurrency: 10,
		maxQueueSize: 100,
	},

	validator: true,

	tracing: {
		enabled: true,
		events: true,
		exporter: [
			{
				type: "Console",
				options: {
					width: 100,
					colors: true,
					gaugeWidth: 40,
				}
			}
		]
	},
};
