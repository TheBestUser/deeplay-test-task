FROM node:current-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json .

ENV NODE_ENV=production

RUN npm install --production

COPY moleculer.config.js service.js ./

CMD ["npm", "start"]
