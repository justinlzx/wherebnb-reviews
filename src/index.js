import express from 'express';
import { routes } from './routes/index.js';
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv'
import { DataSource } from "typeorm"
import  { remoteDbConfig, localDbConfig } from '../db/ormconfig.js';

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes)

const ENV = process.env
const NODE_PORT = ENV.NODE_PORT || 3000;


export const AppDataSource = new DataSource(ENV.USE_DB === "LOCAL" ? localDbConfig : remoteDbConfig)

// stack tracing for debugging
app.use(
  (
    err,
    _req,
    res ,
    _next ,
  ) => {
    console.error(err);
    const code = typeof err.code === "number" ? err.code : 500;
    const stack = ENV.USE_DB === "LOCAL" ? err.stack : "";
    res.status(code).json({
      name: err.name,
      success: false,
      message: err.message,
      stack,
    });
  },
);


AppDataSource.initialize()
    .then(() => {
        app.listen(NODE_PORT, async () => {
          console.log(chalk.bgGreen.white(`CONNECTED TO ${ENV.USE_DB} DB AND APP LISTENING ON PORT ${NODE_PORT}`))
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })





