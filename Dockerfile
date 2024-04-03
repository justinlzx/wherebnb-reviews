FROM node:lts-alpine AS build
ARG SYNC_DB=False
ARG NODE_PORT
ARG REMOTE_DB_TYPE
ARG REMOTE_DB_NAME
ARG REMOTE_DB_PASSWORD
ARG REMOTE_DB_HOST
ARG REMOTE_DB_PORT
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .


EXPOSE 3007
CMD ["node", "src/index.js"]
