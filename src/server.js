import { AppDataSource } from "./database";
import { DatabaseMigrationService } from "./services/DatabaseMigrationService";


AppDataSource.initialize()
 .then(async () => {
    console.log("Data Source has been initialized!")

    //await new DatabaseMigration().handleCreateFoldersFile();
    await new DatabaseMigrationService().handleReadFileToMigrate();
 })
 .catch((err) => {
    console.error("Error during Data Source initialization", err)
 })