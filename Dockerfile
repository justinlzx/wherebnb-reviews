FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .

ENV USE_DB=REMOTE

ENV NODE_PORT=3007

ENV REMOTE_DB_TYPE=mysql
ENV REMOTE_DB_NAME=useful-memory-414316:us-central1:wherebnb-dev-db
ENV REMOTE_DB_USER=root
ENV REMOTE_DB_PASSWORD=wherebnb
ENV REMOTE_DB_HOST=34.173.224.187
ENV REMOTE_DB_PORT=3306

ENV FRONTEND_URL=http://localhost:3000
ENV ACCOMS_URL=http://localhost:3001
ENV BOOKINGS_URL=http://localhost:3002
ENV ACCOUNTS_URL=http://localhost:3003
ENV PROCESS_BOOKING_URL=http://localhost:3004
ENV PAYMENTS_URL=http://localhost:3005
ENV NOTIFICATIONS_URL=http://localhost:3006
ENV REVIEWS_URL=http://localhost:3007
ENV CHECKIN_URL=http://localhost:3008

EXPOSE 3007
CMD ["node", "src/index.js"]
