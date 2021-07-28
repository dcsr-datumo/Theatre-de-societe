SPARQLER=./shell/query-graphdb.sh -e=env/prod.env -h=knora.unil.ch --port=7200 -r=knora-prod -f=json

.PHONY: works_cache.json
works_cache.json: ## build the cache for works
	${SPARQLER} -q=../requests/get_works.sparql | jq -f jq/works-filter.jq > output/works_cache.json

.PHONY: authors_cache.json
authors_cache.json: ## build the cache for works
	${SPARQLER} -q=../requests/get_authors.sparql | jq -f jq/authors-filter.jq > output/authors_cache.json

.PHONY: calendar_cache.json
calendar_cache.json: ## build the cache for works
	${SPARQLER} -q=../requests/get_calendar.sparql | jq -f jq/calendar-filter.jq > output/calendar_cache.json

.PHONY: all_cache
all_cache: works_cache.json authors_cache.json calendar_cache.json ## build all cache files

#.PHONY: cache
#cache: works_cache.json ## build all cache files

.PHONY: clean
clean: ## delete the files that have been worked out so far
	rm output/*

.PHONY: help
help: ## this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+.*:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort

.DEFAULT_GOAL := help
