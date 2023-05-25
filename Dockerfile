FROM node:18-alpine
WORKDIR /app
COPY ["package.json", "./"]
RUN apk add --update --no-cache openssl1.1-compat
RUN apk add --no-cache git ca-certificates python3 gcc make libc-dev libgcc libstdc++ g++ build-base openssl1.1-compat && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN apk add --no-cache --upgrade bash
RUN pip3 install --no-cache --upgrade pip setuptools
RUN pip3 install awscli
RUN apk add terraform
RUN npm install
COPY start_terraform.sh .
RUN chmod +x start_terraform.sh
COPY . .
CMD ["./start_terraform.sh"]