FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY src src
COPY angular.json .
COPY tsconfig.app.json .
COPY tsconfig.json .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist/site2020/* /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf
# test github action