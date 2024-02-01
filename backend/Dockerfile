FROM node:20.10.0

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

ARG API_PORT=3000
EXPOSE ${API_PORT}

ENTRYPOINT [ "yarn", "start:dev" ]