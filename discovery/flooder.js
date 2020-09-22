"use strict";

const request = require('request-promise-native');

const baseUrl = process.env.FLOODER_BASE_URL || "http://localhost:3000"
const max = +process.env.FLOODER_MAX || 10;

function start() {
	let i = 0;
	setInterval(() => {
		request(`${baseUrl}/api/worker/process?requestId=${i}`)
			// .then(res => console.info(res))
			.catch(err => console.error(`${i} - ${err.message}`));
		i = (i + 1) % max;
	}, 10);
}

start()
