'use strict'

import evaParser from "eva-parser";
import {Eva, EvaModuleId} from "eva-core";
import {EvaCliHost} from "./eva-cli-host.js";

function evalGlobal(src: string, eva: Eva, moduleId: EvaModuleId) {
    const exp = evaParser.parse(`(begin ${src})`);
    return eva.eval(exp, { moduleId });
}

export function main(argv: string[]) {
    const [_node, _env, mode, exp] = argv;

    const host = new EvaCliHost();
    const eva = new Eva(host);

    if (mode === '-e') {
        return evalGlobal(exp, eva, '<cli>.eva');
    }

    if (mode === '-f') {
        const entryId = host.resolver.resolve(exp, null) as EvaModuleId; // from = null → cwd
        const src = host.fs.readFile(entryId);
        return evalGlobal(src, eva, entryId);
    }
}
