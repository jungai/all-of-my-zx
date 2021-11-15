.PHONY: default install build-all install-linux

default:
	make install

install:
	pnpm i -r

build-all:
	pnpm -r run build

install-linux:
	pnpm run --filter install-linux task
