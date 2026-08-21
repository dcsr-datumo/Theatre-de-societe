SHELL := /bin/bash

CURL := /usr/bin/curl
DASCH_SPARQL_URL ?= https://db.ls-prod-server.dasch.swiss/dsp-repo/sparql
DASCH_USER ?= admin
FINAL_OUTPUT_DIR ?= output
OUTPUT_DIR ?= $(FINAL_OUTPUT_DIR)
CACHE_FILES := works_cache.json authors_cache.json calendar_cache.json places_cache.json

define build_cache
	@set -euo pipefail; \
	password="$${DASCH_PASSWORD:-$${TS_PSWD:-}}"; \
	if [[ -z "$$password" ]]; then \
		echo "DASCH_PASSWORD is required (legacy TS_PSWD is accepted temporarily)" >&2; \
		exit 2; \
	fi; \
	mkdir -p "$(OUTPUT_DIR)"; \
	tmp="$$(mktemp "$(OUTPUT_DIR)/.$@.XXXXXX")"; \
	trap 'rm -f "$$tmp"' EXIT; \
	"$(CURL)" \
		--fail-with-body \
		--silent \
		--show-error \
		--location \
		--connect-timeout 15 \
		--max-time 300 \
		--header "Accept: application/json" \
		--user "$(DASCH_USER):$$password" \
		--data-urlencode "query@$(1)" \
		"$(DASCH_SPARQL_URL)" \
		| jq -e -f "$(2)" > "$$tmp"; \
	bash validate-cache.sh "$$tmp" "$@"; \
	mv "$$tmp" "$(OUTPUT_DIR)/$@"; \
	trap - EXIT
endef

.PHONY: works_cache.json
works_cache.json: ## 1. build the cache for works
	$(call build_cache,requests/get_works.sparql,jq/works-filter.jq)

.PHONY: authors_cache.json
authors_cache.json: ## 1. build the cache for authors
	$(call build_cache,requests/get_authors.sparql,jq/authors-filter.jq)

.PHONY: calendar_cache.json
calendar_cache.json: ## 1. build the calendar cache
	$(call build_cache,requests/get_calendar.sparql,jq/calendar-filter.jq)

.PHONY: places_cache.json
places_cache.json: ## 1. build the cache for places
	$(call build_cache,requests/get_places.sparql,jq/places-filter.jq)

.PHONY: all_cache
all_cache: works_cache.json authors_cache.json calendar_cache.json places_cache.json ## 2. build and validate all cache files
	@$(MAKE) --no-print-directory validate_caches

.PHONY: validate_caches
validate_caches: ## 2. validate the complete generated cache set
	@set -euo pipefail; \
	for file in $(CACHE_FILES); do \
		test -s "$(OUTPUT_DIR)/$$file"; \
		bash validate-cache.sh "$(OUTPUT_DIR)/$$file" "$$file"; \
	done

.PHONY: refresh
refresh: ## 2. generate a complete cache set before promoting it to output
	@set -euo pipefail; \
	mkdir -p "$(FINAL_OUTPUT_DIR)"; \
	staging="$$(mktemp -d "$(FINAL_OUTPUT_DIR)/.generation.XXXXXX")"; \
	trap 'rm -rf "$$staging"' EXIT; \
	$(MAKE) --no-print-directory OUTPUT_DIR="$$staging" all_cache; \
	for file in $(CACHE_FILES); do \
		mv "$$staging/$$file" "$(FINAL_OUTPUT_DIR)/$$file"; \
	done

.PHONY: copy_local
copy_local: validate_caches ## 3. copy the validated cache files into the application source
	cp $(addprefix $(FINAL_OUTPUT_DIR)/,$(CACHE_FILES)) ../site2020/src/assets/cache/

.PHONY: clean
clean: ## 0. delete generated cache files and interrupted staging directories
	rm -f $(addprefix $(FINAL_OUTPUT_DIR)/,$(CACHE_FILES))
	rm -rf $(FINAL_OUTPUT_DIR)/.generation.*

.PHONY: help
help: ## show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+.*:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort -k2

ACCOUNT ?= platec
CONTAINER ?= tds_cache_updater
VERSION ?= v2.0.2
ENVFILE ?= env/dasch.env

.PHONY: build
build: ## 4. docker: build the cache-updater container
	docker build -t ${ACCOUNT}/${CONTAINER}:${VERSION} .

.PHONY: run
run: ## 4. docker: run the freshly built container
	docker run --env-file ${ENVFILE} -v ${PWD}/output:/app/output --rm ${ACCOUNT}/${CONTAINER}:${VERSION}

.PHONY: rmi
rmi: ## 4. docker: remove the built image
	docker rmi ${ACCOUNT}/${CONTAINER}:${VERSION}

.PHONY: login
login: ## 5. docker: log in to Docker Hub
	docker login -u ${ACCOUNT}

.PHONY: push
push: ## 5. docker: push the image to Docker Hub
	docker push ${ACCOUNT}/${CONTAINER}:${VERSION}

.DEFAULT_GOAL := help
