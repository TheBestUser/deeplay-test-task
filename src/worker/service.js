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
			// shardKey: "requestId",
			/** @param {Context} ctx  */
			async handler(ctx) {
				this.logger.info(`${ctx.params.requestId} - ${this.broker.instanceID}`);

				return this.Promise.resolve(this.broker.instanceID).delay(100);
			}
		}
	},
};
