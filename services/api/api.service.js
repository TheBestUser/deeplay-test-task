"use strict";

const ApiGateway = require("moleculer-web");

module.exports = {
	name: "api",
	mixins: [ApiGateway],
	settings: {
		ip: "0.0.0.0",
		port: process.env.PORT || 3000,
		routes: [
			{
				path: "/api",
				whitelist: [
					"**"
				],
				mergeParams: true,
				authentication: false,
				authorization: false,
				autoAliases: true,
				bodyParsers: {
					json: {
						strict: false,
						limit: "1MB"
					},
					urlencoded: {
						extended: true,
						limit: "1MB"
					}
				},
				mappingPolicy: "all",
				logging: true
			}
		],
		log4XXResponses: false,
		logRequestParams: false,
		logResponseData: false,
	},
};
