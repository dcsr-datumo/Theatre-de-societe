FROM debian:stable

RUN mkdir /app

COPY refreshCacheCalendarYear.py requirements.txt /app/

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends python3 python3-pip

RUN pip3 install -r /app/requirements.txt

CMD python3 /app/refreshCacheCalendarYear.py \
    -v${KNORA_USER} -q${KNORA_PSWD} -t${KNORA_HOST} -u${GRAPHDB_USER} \
    -p${GRAPHDB_PSWD} -s${GRAPHDB_HOST} -r${REPO}