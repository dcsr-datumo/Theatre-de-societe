FROM debian:stable AS build

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends jq make curl

FROM build

RUN mkdir /app

COPY jq/ /app/jq
COPY requests/ /app/requests
COPY Makefile /app

CMD cd /app && make clean && make all_cache