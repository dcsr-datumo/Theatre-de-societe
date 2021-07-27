ACCOUNT=platec
CONTAINER=tds_cache_updater
VERSION=v0.0.2
ENVFILE=docker_env_prod_root

.PHONY: build
build: ## builds the web-app container
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


.PHONY: help
help: ## this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort

.DEFAULT_GOAL := help
