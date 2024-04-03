# wherebnb-reviews

wherebnb-reviews is an orchestrator that receives review data from wherebnb-frontend and 

1. updates the reviewed accommodation's rating
2. writes the new review to the Review DB, allowing it to be displayed on wherebnb-frontend
3. sends a notification email to the host to tell them their property has been reviewed 

## Getting Started
1. Clone the repository
2. Install dependencies
``sh
  npm install
``

3. Create a `.env` file in the root directory

  ```sh
    NODE_PORT = 3007

    SYNC_DB = FALSE

    USE_DB = FREEDB

    LOCAL_DB_TYPE = mysql
    LOCAL_DB_NAME = wherebnb-dev-db-local
    LOCAL_DB_USER = root
    LOCAL_DB_PASSWORD = <insert.db.password>
    LOCAL_DB_HOST = 127.0.0.1
    LOCAL_DB_PORT = 3306

    REMOTE_DB_TYPE = mysql
    REMOTE_DB_NAME = useful-memory-414316:us-central1:wherebnb-dev-db
    REMOTE_DB_USER = root
    REMOTE_DB_PASSWORD = <insert.db.password>
    REMOTE_DB_HOST = <insert.db.host>
    REMOTE_DB_PORT = 3306

    FRONTEND_URL=http://localhost:3000
    ACCOMS_URL=http://localhost:3001
    BOOKINGS_URL=http://localhost:3002
    ACCOUNTS_URL=http://localhost:3003
    PROCESS_BOOKING_URL=http://localhost:3004
    PAYMENTS_URL=http://localhost:3005
    NOTIFICATIONS_URL=http://localhost:3006
    REVIEWS_URL=http://localhost:3007
    CHECKIN_URL=http://localhost:3008
  ```

3. (a) Build and run the Docker container:

    ```sh
    docker build -t wherebnb-reviews .
    docker run -p 3007:3007 wherebnb-reviews
    ```
3. (b) Run app on development server:

- connect to the cloud database
  ```sh
    npm run dev:remote 
  ```
- connect to the local database
  ```sh
    npm run dev 
  ```

- Synchronise cloud database with ORM
  ```sh
    npm run sync:remote
  ```
- Synchronise local database with ORM
  ```sh
    npm run sync
  ```
