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

.PHONY: deploy
deploy:
	make build
	# scp ./package.json pi:~/workspace/pi-status/package.json
	scp -r ./node_modules pi:~/workspace/pi-status/node_modules/
	scp -r ./dist pi:~/workspace/pi-status/dist/

.PHONY: release
release:
	make install
	make build

.PHONY: start
start:
	npm run start

.PHONY: serve
serve:
	npm run serve

.PHONY: debug
debug:
	npm run debug

.PHONY: logs
logs:
	npx firebase functions:log --project com-gairal-chrapper

