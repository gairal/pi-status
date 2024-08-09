SHELL := /bin/bash
BRANCH := $(shell git branch | sed -n -e 's/^\* \(.*\)/\1/p')
VERSION := $(shell git describe --abbrev=0 --tags)

.PHONY: install
install:
	bun i

.PHONY: test
test:
	bun lint
	bun run test

.PHONY: build
build:
	bun run build
	cp -r src/public dist/

.PHONY: release
release:
	git pull
	make install
	make build
	pm2 restart status

.PHONY: start
start:
	bun start

