FROM debian:stable AS build

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends jq make curl

FROM build

RUN mkdir /app

COPY jq/ /app/jq
COPY shell/ /app/shell
COPY requests/ /app/requests
COPY Makefile /app
COPY shell/wwwenc /usr/bin/

CMD cd /app && make clean && make all_cache_enc