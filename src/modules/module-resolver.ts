import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import evaParser from "../parser/evaParser.cjs";
import { EvaBeginBlock } from "../model/eva-model";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class EvaModuleResolver {
    private readonly modulesCache = new Map<string, EvaBeginBlock>();

    getOrLoadModule(name: string): EvaBeginBlock {
        if (!this.modulesCache.has(name)) {
            this.modulesCache.set(name, this.loadModule(name));
        }
        return this.modulesCache.get(name);
    }

    private loadModule(name: string): EvaBeginBlock {
        const moduleSrc = fs.readFileSync(`${__dirname}/${name}.eva`, 'utf8');
        return evaParser.parse(`(begin ${moduleSrc})`);
    }
}
