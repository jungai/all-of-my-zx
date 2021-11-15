.PHONY: default install build-all install-linux build-clean

default:
	make install

install:
	pnpm i -r

build-all:
	pnpm -r run build

build-clean:
	find . -type d -name 'esm' | xargs rm -rf '{}'

install-linux:
	pnpm run --filter install-linux task
