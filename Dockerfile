FROM node:lts

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

ENTRYPOINT sh ./docker-entrypoint.sh
