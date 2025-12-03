import evaParser from "eva-parser";
import {EvaBeginBlock, EvaFileSystem, EvaModuleId} from "../model/index.js";

export default class EvaModuleLoader {
    private readonly modulesCache = new Map<EvaModuleId, EvaBeginBlock>();

    constructor(private readonly fs: EvaFileSystem) {}

    getOrLoadModule(moduleId: EvaModuleId): EvaBeginBlock {
        if (!this.modulesCache.has(moduleId)) {
            this.modulesCache.set(moduleId, this.loadModule(moduleId));
        }
        return this.modulesCache.get(moduleId);
    }

    private loadModule(moduleId: EvaModuleId): EvaBeginBlock {
        const moduleSrc = this.fs.readFile(moduleId);
        return evaParser.parse(`(begin ${moduleSrc})`);
    }
}
