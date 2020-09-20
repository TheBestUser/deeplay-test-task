const { ServiceBroker } = require("moleculer");
const _ = require('lodash');

function createBroker(opts) {
	const broker = new ServiceBroker({
		...require('../../src/worker/moleculer.config'),
		...opts,
		transporter: "NATS",
	});

	if (broker.nodeID !== "main") {
		broker.createService(require('../../src/worker/service'));
	}

	return broker;
}

const main = createBroker({ nodeID: "main" });
const broker1 = createBroker({ nodeID: "worker-1" });
const broker2 = createBroker({ nodeID: "worker-2" });
const broker3 = createBroker({ nodeID: "worker-3" });
const broker4 = createBroker({ nodeID: "worker-4" });

async function start() {
	await main.start();
	await broker1.start();
	await broker2.start();
	await broker3.start();
	await broker4.start();

	main.logger.warn("Brokers started.");

	main.repl();

	const usernames = ["john", "bob", "adam", "steve", "mark"];

	setInterval(async () => {
		const name = usernames[_.random(usernames.length - 1)];
		await main.call("worker.process", { requestId: name });
	}, 1000);
}

start();
