FROM node:lts-alpine
RUN mkdir /app
WORKDIR /app

COPY package.json ./
COPY .npmrc ./

RUN npm install

COPY .env ./
COPY tsconfig.json .
COPY src src

CMD npm start