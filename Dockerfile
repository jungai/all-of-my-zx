FROM ubuntu:20.10

RUN apt-get update && \
    apt-get install -y curl git sudo && \
    su -c 'curl -sL https://deb.nodesource.com/setup_16.x | bash -' && \
    su -c 'apt install -y nodejs' && \
    npm i -g zx && \
    npm i -g pnpm

WORKDIR /home

COPY ./package.json ./package.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY ./scripts/install-linux/package.json ./scripts/install-linux/package.json

RUN pnpm install -r

COPY . .

CMD ["echo", "hello"]
# COPY . /home


