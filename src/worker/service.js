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
			/** @param {Context} ctx  */
			async handler(ctx) {
				this.logger.info(ctx.params.requestId);

				return this.Promise.resolve(this.broker.instanceID).delay(100);
			}
		}
	},
};
