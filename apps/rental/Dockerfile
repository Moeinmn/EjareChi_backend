FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json .
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm ci

COPY apps/rental apps/rental
COPY libs libs

RUN npm run build rental

CMD ["node" , "dist/apps/rental/main"]