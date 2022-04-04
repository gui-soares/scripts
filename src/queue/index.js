import * as fastq from "fastq";
import dontenv from "dotenv";
import { existsSync } from "fs";

import { AppDataSource } from "../database";
import AWSService from "../services/AWSService";

dontenv.config();

const fileName = [
    "frame_02h_feed.png",
    "frame_05h_feed.png", 
    "frame_06h_feed.png", 
    "frame_07h_feed.png", 
    "frame_11h_feed.png", 
    "imagem_apoio.png", 
    "logo.png", 
    "margem_direita_feed.png", 
    "margem_esquerda_feed.png", 
    "moldura_borda_feed.png", 
    "moldura_fio_feed.png", 
    "rodape_feed.png", 
    "terco_inferior_feed.png", 
    "terco_superior_feed.png",
    "cabecalho_feed.png",
    "cabecalho_story.png",
    "frame_02h_story.png",
    "frame_05h_story.png",
    "frame_06h_story.png",
    "frame_07h_story.png",
    "frame_11h_story.png",
    "rodape_story.png",
    "margem_direita_story.png",
    "margem_esquerda_story.png",
    "moldura_fio_story.png",
    "moldura_borda_story.png",
    "terco_inferior_story.png",
    "terco_superior_story.png",
];

const fonts = [
    "bold.otf",
    "italic.otf",
    "regular.otf",
    "bold.ttf",
    "italic.ttf",
    "regular.ttf",
];

const awsService = new AWSService();

const asyncWorker = async (arg) => {
  try {
   const path = process.env.ENXOVAL_DIR;

   const loginRepository = AppDataSource.getRepository("Login");

   const login = await loginRepository.findOne({ where: { id_login: arg.id }});

   if (login) {

    const promises = [];

    fileName.forEach((file) => {
        const filePath = `${path}/${arg.id}/${file}`;
        const fileName = `enxoval/${arg.id}/${file}`;

        const exists = existsSync(filePath);

        if (exists) {
          promises.push(awsService.uploadFile({
              filePath,
              fileName,
          }));  
        }
    });

    fonts.forEach((font) => {
        const filePath = `${path}/${arg.id}/FONTE/${font}`;
        const fileName = `enxoval/${arg.id}/FONTE/${font}`; 

        const exists = existsSync(filePath);

        if (exists) {
          promises.push(awsService.uploadFile({
              filePath,
              fileName,
          }));  
        }
    })

    await Promise.all(promises);
       
   }
} catch (err) {
    console.error(err);
}
};

const queue = fastq.promise(asyncWorker, 1);

export { queue }