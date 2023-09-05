FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json .
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm ci

COPY apps/search apps/search
COPY libs libs

RUN npm run build search

CMD ["node" , "dist/apps/search/main"]