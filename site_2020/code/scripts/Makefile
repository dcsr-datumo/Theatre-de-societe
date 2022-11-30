CURL=/usr/bin/curl -H "Accept: application/json"
URL=https://admin:${TS_PSWD}@db.ls-prod-server.dasch.swiss/dsp-repo/sparql

.PHONY: works_cache.json
works_cache.json: ## 1. build the cache for works
	${CURL}  --data-urlencode "query@requests/get_works.sparql" ${URL} | jq -f jq/works-filter.jq > output/works_cache.json

.PHONY: authors_cache.json
authors_cache.json: ## 1. build the cache for works
	${CURL}  --data-urlencode "query@requests/get_authors.sparql" ${URL} | jq -f jq/authors-filter.jq > output/authors_cache.json

.PHONY: calendar_cache.json
calendar_cache.json: ## 1. build the cache for works
	${CURL}  --data-urlencode "query@requests/get_calendar.sparql" ${URL} | jq -f jq/calendar-filter.jq > output/calendar_cache.json

.PHONY: places_cache.json
places_cache.json: ## 1. build the cache for places
	${CURL}  --data-urlencode "query@requests/get_places.sparql" ${URL} | jq -f jq/places-filter.jq > output/places_cache.json

.PHONY: all_cache
all_cache: works_cache.json authors_cache.json calendar_cache.json places_cache.json ## 2. build all cache files

.PHONY: copy_local
copy_local: ## 3. copy the cache data files in the source before building the app
	cp output/*.json ../site2020/src/assets/cache/

#.PHONY: copy_remote
#copy_remote: ## copy the cache data files on a docker app
#	podman cp output/*.json tds:/usr/share/nginx/html/cache/

.PHONY: clean
clean: ## 0. delete the files that have been worked out so far
	rm -f output/*.json 

.PHONY: help
help: ## this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+.*:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort -k2

# yes, this makefile is used to dockerized itself
ACCOUNT=platec
CONTAINER=tds_cache_updater
VERSION=v2.0.0
ENVFILE=docker_env_prod_dasch

.PHONY: build
build: ## 4. docker: builds the web-app container
	docker build -t ${ACCOUNT}/${CONTAINER}:${VERSION} .

.PHONY: run
run: ## 4. docker: run the freshly built container
	docker run --env-file ${ENVFILE} --rm ${ACCOUNT}/${CONTAINER}:${VERSION}

.PHONY: rmi
rmi: ## 4. docker: remove the build image
	docker rmi ${CONTAINER}:${VERSION}

.PHONY: login
login: ## 5. docker: docker hub login
	docker login -u ${ACCOUNT}

.PHONY: push
push: ## 5. docker: push the image to docker hub
	docker push ${ACCOUNT}/${CONTAINER}:${VERSION}

.DEFAULT_GOAL := help
