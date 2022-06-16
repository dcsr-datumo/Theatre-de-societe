#SPARQLER=./shell/query-graphdb.sh -e=env/prod.env -h=knora.unil.ch --port=7200 -r=knora-prod -f=json
SPARQLER=./shell/query-graphdb.sh -u=${GRAPHDB_USER} -p=${GRAPHDB_PSWD} -h=${HOST} --port=${PORT} -r=${REPO} -f=json

.PHONY: works_cache.json
works_cache.json: ## build the cache for works
	${SPARQLER} -q=requests/get_works.sparql | jq -f jq/works-filter.jq > output/works_cache.json

.PHONY: authors_cache.json
authors_cache.json: ## build the cache for works
	${SPARQLER} -q=requests/get_authors.sparql | jq -f jq/authors-filter.jq > output/authors_cache.json

.PHONY: calendar_cache.json
calendar_cache.json: ## build the cache for works
	${SPARQLER} -q=requests/get_calendar.sparql | jq -f jq/calendar-filter.jq > output/calendar_cache.json

.PHONY: places_cache.json
places_cache.json: ## build the cache for places
	${SPARQLER} -q=requests/get_places.sparql | jq -f jq/places-filter.jq > output/places_cache.json

.PHONY: all_cache
all_cache: works_cache.json authors_cache.json calendar_cache.json places_cache.json ## build all cache files

.PHONY: all_cache_enc
all_cache_enc:  ## build all cache files encoded request
	${SPARQLER} -q=requests/get_works.enc | jq -f jq/works-filter.jq > output/works_cache.json
	${SPARQLER} -q=requests/get_authors.enc | jq -f jq/authors-filter.jq > output/authors_cache.json
	${SPARQLER} -q=requests/get_calendar.enc | jq -f jq/calendar-filter.jq > output/calendar_cache.json
	${SPARQLER} -q=requests/get_places.enc | jq -f jq/places-filter.jq > output/places_cache.json

.PHONY: copy_local
copy_local: ## copy the cache data files in the source before building the app
	cp output/*.json ../site2020/src/assets/cache/

#.PHONY: copy_remote
#copy_remote: ## copy the cache data files on a docker app
#	podman cp output/*.json tds:/usr/share/nginx/html/cache/

.PHONY: clean
clean: ## delete the files that have been worked out so far
	rm -f output/*.json 

.PHONY: help
help: ## this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+.*:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort

# yes, this makefile is used to dockerized itself
ACCOUNT=platec
CONTAINER=tds_cache_updater
VERSION=v1.1.1
ENVFILE=docker_env_prod_root

.PHONY: build
build: ## builds the web-app container
	wwwenc < requests/get_authors.sparql > requests/get_authors.enc
	wwwenc < requests/get_works.sparql > requests/get_works.enc
	wwwenc < requests/get_calendar.sparql > requests/get_calendar.enc
	wwwenc < requests/get_places.sparql > requests/get_places.enc
	docker build -t ${ACCOUNT}/${CONTAINER}:${VERSION} .

.PHONY: run
run: ## run the freshly built container
	docker run --env-file ${ENVFILE} --rm ${ACCOUNT}/${CONTAINER}:${VERSION}

.PHONY: rmi
rmi: ## remove the build image
	docker rmi ${CONTAINER}:${VERSION}

.PHONY: login
login: ## docker hub login
	docker login -u ${ACCOUNT}

.PHONY: push
push: ## push the image to docker hub
	docker push ${ACCOUNT}/${CONTAINER}:${VERSION}

.DEFAULT_GOAL := help
