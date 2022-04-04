
import { writeFileSync, readdirSync, readFileSync } from "fs";
import { resolve } from "path";
import { queue } from "../queue";



class DatabaseMigrationService {

    async handleCreateFoldersFile() {
        try {
            const path = process.env.ENXOVAL_DIR;

            const list = readdirSync(path).filter(f => f !== ".DS_Store");


            const json = JSON.stringify({ list });

            writeFileSync('folders.json', json);

        } catch (err) {
            console.log(err);
        }
    }

    async handleReadFileToMigrate() {
        try {

           const filePath = resolve(__dirname, "..", "..", "folders.json");

           const data = readFileSync(filePath, "utf-8");

           const parsedData = JSON.parse(data);

           parsedData.list.forEach((id) => {
               queue.push({ id });
           });

        } catch (err) {
            console.log(err);
        }
    }
}

export { DatabaseMigrationService }