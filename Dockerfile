FROM node:18-alpine as base
RUN apk add --update --no-cache openssl1.1-compat
RUN apk add --no-cache git ca-certificates python3 gcc make libc-dev libgcc libstdc++ g++ build-base openssl1.1-compat && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN apk add --no-cache --upgrade bash
RUN pip3 install --no-cache --upgrade pip setuptools
RUN pip3 install awscli
RUN apk add terraform
WORKDIR /app

FROM base as default
WORKDIR /app
COPY ["package.json", "./"]
COPY start_terraform.sh .
RUN chmod +x start_terraform.sh

FROM default as dev
WORKDIR /app
RUN npm install

# CI layer
FROM dev as ci
WORKDIR /app/
COPY . .

#local layer
FROM base as local
WORKDIR /app/
COPY --from=ci /app/ .
COPY --from=dev /app/node_modules node_modules/
EXPOSE 3000
CMD ["./start_terraform.sh"]




