ACCOUNT=platec
CONTAINER=tds
VERSION=${VERSION_TAG}

.PHONY: build
build: ## builds the web-app container
	docker build -t ${ACCOUNT}/${CONTAINER}:${VERSION} .

.PHONY: runlocal
runlocal: ## run the freshly built container
	docker run -p 80:80 --name tds ${ACCOUNT}/${CONTAINER}:${VERSION}

.PHONY: stop
stop: ## stop the docker instance
	docker stop tds

.PHONY: rm
rm: ## remove the container
	docker rm tds

.PHONY: rmi
rmi: ## remove the build image
	docker rmi ${ACCOUNT}/${CONTAINER}:${VERSION}

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
