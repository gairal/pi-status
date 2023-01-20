SHELL := /bin/bash
BRANCH := $(shell git branch | sed -n -e 's/^\* \(.*\)/\1/p')
VERSION := $(shell git describe --abbrev=0 --tags)

.PHONY: install
install:
	pnpm i

.PHONY: test
test:
	pnpm lint
	pnpm test

.PHONY: build
build:
	pnpm build
	cp -r src/public dist/

.PHONY: release
release:
	git pull
	make install
	make build
	pm2 restart status

.PHONY: start
start:
	pnpm start

