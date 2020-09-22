FROM node:current-alpine

RUN apk add --update \
    curl \
    && rm -rf /var/cache/apk/*

RUN mkdir /app
WORKDIR /app

COPY package.json .

ENV NODE_ENV=production

RUN npm install --production

COPY . .

CMD ["npm", "start"]
