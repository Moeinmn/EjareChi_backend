FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json .
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
COPY schema.prisma schema.prisma
COPY .env .env

RUN npm ci

COPY apps/booking apps/booking
COPY libs libs

RUN npx prisma db pull
RUN npx prisma generate
RUN npm run build booking

CMD ["node" , "dist/apps/booking/main"]