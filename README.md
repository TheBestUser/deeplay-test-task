[![Moleculer](https://badgen.net/badge/Powered%20by/Moleculer/0e83cd)](https://moleculer.services)

# Deeplay Test
This is a [Moleculer](https://moleculer.services)-based microservices project.

## Usage

Start the project with `npm run dc:up` command and display logs with `npm run dc:logs` command.
After starting, open the http://localhost:3000/api/worker/process?requestId=SOME URL in your browser, where `SOME` is a non-empty string. The server will return the id of the instance that processed the request. 
Shard strategy assumes that requests with the same requestId will be processed by one worker instance. 

## Local
1. Start transport with `npm run dc:nats` command.
2. Create `.env` file in root directory and fill it with data, for example:
```
NAMESPACE=deeplay
TRANSPORTER=nats
```
3. Start api service with `npm run start:api` command.
3. Start worker service with `npm run start:worker` command. 
> Repeat step 3 as many times as you want worker instances.
4. Start flooder script with `npm run start:flood` command.
> Number of values requestId can be changed by an `FLOODER_MAX` environment variable.

## Shard testing

1. Start shard strategy test with `npm run test:shard` command.
2. Check that requests with the same requestId are processed by one worker instance.

## Retry testing

1. Start retry policy test with `npm run test:retry` command.
2. Wait 20 seconds for the request flood to end
3. After that, wait another 10 seconds for the results to be displayed

## NPM scripts

- `npm run dev`: Start development mode (load all services locally with hot-reload & REPL)
- `npm run start`: Start production mode (set `SERVICES` env variable to load certain services)
- `npm run start:api`: Start api service locally
- `npm run start:worker`: Start worker service locally
- `npm run start:flood`: Start flood script
- `npm run cli`: Start a CLI and connect to production. Don't forget to set production namespace with `--ns` argument in script{{#lint}}
- `npm run ci`: Run continuous test mode with watching
- `npm test`: Run tests & generate coverage report
- `npm disc:shard`: Run a test script to verify that sharding strategy is working
- `npm disc:retry`: Run a test script to verify that retry policy is working
- `npm "lint`: Run ESLint
- `npm run dc:up`: Start the stack with Docker Compose (api service & 4 worker service)
- `npm run dc:nats`: Start NATS container
- `npm run dc:logs`: Display logs in follow mode
- `npm run dc:down`: Stop the stack with Docker Compose
