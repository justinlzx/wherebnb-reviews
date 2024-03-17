import { entityList } from "../src/entity/entityList.js"
import dotenv from 'dotenv'

dotenv.config()

const ENV = process.env 
const syncDB = ENV.SYNC_DB


export const remoteDbConfig = {
    "name": ENV.REMOTE_DB_NAME,
    "type": ENV.REMOTE_DB_TYPE,
    "host": ENV.REMOTE_DB_HOST,
    "port": ENV.REMOTE_DB_PORT,
    "username": ENV.REMOTE_DB_USER,
    "password": ENV.REMOTE_DB_PASSWORD,
    "database": "reviews",
    "entities": entityList,
    "synchronize": syncDB || false
}

export const localDbConfig = {
    "name": ENV.LOCAL_DB_NAME,
    "type": ENV.LOCAL_DB_TYPE,
    "host": ENV.LOCAL_DB_HOST,
    "port": ENV.LOCAL_DB_PORT,
    "username": ENV.LOCAL_DB_USER,
    "password": ENV.LOCAL_DB_PASSWORD,
    "database": "reviews",
    "entities": entityList,
    "synchronize": syncDB || false
}