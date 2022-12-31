import dotenv from 'dotenv';
import url from 'url';
import path, { dirname } from 'path';

const filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(filename);
console.log(path.join(__dirname + '/../../.env'))
dotenv.config({
    path: path.join(__dirname + '/../../.env'),
});

export const config = {
    PORT: process.env.PORT,
}