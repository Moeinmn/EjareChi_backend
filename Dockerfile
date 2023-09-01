FROM node:18-alpine

WORKDIR /usr/scr/app

COPY package*.json .
RUN npm ci 

COPY . .

RUN npx prisma db pull
RUN npx prisma generate
RUN apk add --no-cache bash

CMD ["bash","./run.sh"]