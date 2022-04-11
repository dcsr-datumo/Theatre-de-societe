FROM node:10-alpine AS builder

WORKDIR /app

COPY package.json .
RUN npm update -g
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist/site2020/* /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf
