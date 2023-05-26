FROM node:16-alpine3.16 As development

WORKDIR /home/node/dev/quiz-api

COPY package*.json ./

RUN npm install --quiet

COPY .env ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src ./src