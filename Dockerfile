FROM node:18-alpine
WORKDIR /app
COPY ["package.json", "./"]
RUN apk add --update --no-cache openssl1.1-compat
RUN npm install
COPY . .
CMD ["npm", "run", "start:dev"]