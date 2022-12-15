FROM node:lts-alpine

RUN mkdir/app
WORKDIR /client
COPY package*.json ./
RUN npm i
COPY . .
CMD npm start