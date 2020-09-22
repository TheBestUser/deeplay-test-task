const { ServiceBroker } = require("moleculer");
const { MoleculerRetryableError } = require("moleculer").Errors;
const _ = require('lodash');

const workerNodesNum = process.env.WORKERS_NUM || 4;
const errorPercent = process.env.ERROR_PERCENT || 33;

function createBroker(opts) {
	const broker = new ServiceBroker({
		...require('../src/worker/moleculer.config'),
		...opts,
		transporter: "NATS",
	});

	if (broker.nodeID !== "main") {
		broker.createService(_.defaultsDeep(
			require('../src/worker/service'),
			{
				hooks: {
					before: {
						async process(ctx, res) {
							if (Math.floor(Math.random() * 100) <= errorPercent) {
								throw new MoleculerRetryableError(
									"Some retryable thing happened",
									501,
									"ERR_SOMETHING",
									{ requestID: ctx.requestID }
								)
							}
							return res;
						}
					}
				}
			},
		));
	}

	return broker;
}

const main = createBroker({ nodeID: "main" });
const brokers = [];
for (let i = 0; i < workerNodesNum; i++) {
	brokers.push(createBroker({ nodeID: `worker-${i}` }))
}

async function start() {
	// let onlineBrokers = [];

	await main.start();
	await Promise.all(brokers.map(broker => broker.start()
		// .then(() => onlineBrokers.push(broker))
	));

	main.logger.warn("Brokers started.");

	main.repl();

	let reqCount = 0;

	const failedRequests = [];
	const usernames = ["john", "bob", "adam", "steve", "mark"];

	/** Flood with interval */
	const intervalId1 = setInterval(async () => {
		const name = usernames[_.random(usernames.length - 1)];
		await main.call("worker.process", { requestId: name })
			.catch(e => failedRequests.push(e.data.requestID));
		reqCount++;
	}, 10);

	/** Disable random broker */
	// const intervalId2 = setInterval(async () => {
	// 	if (onlineBrokers.length < 2) {
	// 		return;
	// 	}
	//
	// 	const rand = _.random(onlineBrokers.length - 1);
	// 	await onlineBrokers[rand].stop();
	// 	onlineBrokers = onlineBrokers.slice(rand, 1);
	// }, 5000);

	/** Disable flood */
	setTimeout(() => {
		clearInterval(intervalId1);
		// clearInterval(intervalId2);
	},20000);

	/** Stats */
	setTimeout(() => {
		main.logger.warn(failedRequests);
		main.logger.warn(`Total: ${reqCount}`);
		main.logger.warn(`Failed: ${failedRequests.length} (${Math.round(failedRequests.length/reqCount*100)}%)`);
	},30000);
}

start();
