FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json .
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm ci

COPY apps/booking apps/booking
COPY libs libs

RUN npm run build booking

CMD ["node" , "dist/apps/booking/main"]