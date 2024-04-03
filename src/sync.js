import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { localDbConfig, remoteDbConfig } from "../db/ormconfig.js";
import chalk from 'chalk';

dotenv.config();

const ENV = process.env

let dataSource;
new DataSource(ENV.USE_DB === "LOCAL" ? localDbConfig : remoteDbConfig)
  .initialize()
  .then((connectedDatasource) => {
    console.log("Completed database sync");
    dataSource = connectedDatasource;
  })
  .catch((error) => console.log(error))
  .finally(() => dataSource.destroy())
  .then(() => console.log(chalk.bgGreen("Database gracefully closed")));
