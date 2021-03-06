SHELL := /bin/bash
BRANCH := $(shell git branch | sed -n -e 's/^\* \(.*\)/\1/p')
VERSION := $(shell git describe --abbrev=0 --tags)

.PHONY: install
install:
	npm i

.PHONY: test
test:
	npm run lint
	npm run test

.PHONY: build
build:
	npm run build
	cp -r src/public dist/

.PHONY: release
release:
	git pull
	make install
	make build
	pm2 restart status

.PHONY: start
start:
	npm run start

