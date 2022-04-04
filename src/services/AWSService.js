import S3 from "aws-sdk/clients/s3";
import dotenv from "dotenv";
import { readFileSync, unlinkSync } from "fs";

dotenv.config();

class AWSService {

    constructor() {
        this.s3 = new S3({
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
            region: process.env.AWS_REGION,
            apiVersion: "latest",
        });
    }

    async uploadFile({ filePath, fileName }) {
        const fileContent = readFileSync(filePath);

        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: fileName,
            Body: fileContent,
        };

        const data = await this.s3.upload(params).promise();

        //linha para apagar o arquivo depois do upload
        //unlinkSync(filePath);

        return data.Location;
    }
}

export default AWSService;