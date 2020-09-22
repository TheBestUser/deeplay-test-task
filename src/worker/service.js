"use strict";

module.exports = {
	name: "worker",

	actions: {
		/**
		 * Do work
		 *
		 * @param {String} requestId - id of request
		 */
		process: {
			rest: "/process",
			params: {
				requestId: "string"
			},
			retryPolicy: {
				enabled: true,
				retries: 3,
				delay: 500
			},
			timeout: 5000,
			strategy: "Shard",
			strategyOptions: {
				// shardKey: "requestId",
				shardKey: "req.query.requestId",
				ringSize: 100,
				vnodes: 12
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				this.logger.info(`[${ctx.requestID} -> ${this.broker.instanceID}] (${ctx.params.requestId})`);

				return this.Promise.resolve(this.broker.instanceID).delay(1000);
			}
		}
	},
};
