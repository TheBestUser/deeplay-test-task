"use strict";

const { ServiceBroker } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;
const TestService = require("../../../services/worker.service");

describe("Test 'worker' service", () => {
	const broker = new ServiceBroker({ nodeID: "1", logger: false });
	broker.createService(TestService);

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	describe("Test 'worker.process' action", () => {

		it("should return instance ID", async () => {
			const { instanceID } = broker;
			const res = await broker.call("worker.process", { requestId: "" });
			expect(res).toBe(instanceID);
		});

		it("should reject an ValidationError", async () => {
			expect.assertions(1);
			try {
				await broker.call("worker.process");
			} catch(err) {
				expect(err).toBeInstanceOf(ValidationError);
			}
		});

	});

});

