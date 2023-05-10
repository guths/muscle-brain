FROM node:18-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
RUN apk add --update --no-cache openssl1.1-compat
CMD ["npm", "run", "start:dev"]