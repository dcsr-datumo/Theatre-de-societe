FROM node:20.19.0-alpine@sha256:8bda036ddd59ea51a23bc1a1035d3b5c614e72c01366d989f4120e8adca196d4 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY src src
COPY tests tests
RUN node --test tests/format-knora-date.cjs
COPY angular.json .
COPY tsconfig.app.json .
COPY tsconfig.json .

RUN npm run build

FROM nginx:1.27.2-alpine@sha256:74175cf34632e88c6cfe206897cbfe2d2fecf9bf033c40e7f9775a3689e8adc7

COPY --from=builder /app/dist/site2020/ /usr/share/nginx/html/
# /assets redirects resolve to /img, /doc and /cache at the web root.
COPY src/assets/ /usr/share/nginx/html/

COPY nginx-global.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
