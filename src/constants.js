import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const parrentDir = dirname(__dirname);

export const STORE_PATH = join(`${parrentDir}/data/tasks.json`);
export const ERR = "\x1b[37m\x1b[41m ERROR \x1b[0m";
export const TT = "\x1b[37m\x1b[44m TASK \x1b[0m";
export const HP = "\x1b[37m\x1b[42m ————— HELP ————— \x1b[0m";