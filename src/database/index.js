import { DataSource } from "typeorm";

import config from "../../ormconfig";


const AppDataSource = new DataSource(config);

export { AppDataSource }