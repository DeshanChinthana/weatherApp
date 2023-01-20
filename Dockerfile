FROM node:17-alpine

WORKDIR /app

COPY package.json .

RUN npm ci

RUN npm run build

ENV NODE_ENV production

EXPOSE 3000

CMD [ "npm", "serve", "build" ]