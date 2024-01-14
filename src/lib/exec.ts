import { exec as execRaw } from "child_process";
import util from "util";
export const exec = util.promisify(execRaw);
