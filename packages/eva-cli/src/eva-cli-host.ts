import fs from "fs";
import path from "path";
import {EvaHost, EvaModuleId} from "eva-core";

export class EvaCliHost implements EvaHost {
  fs = {
    readFile(moduleId: EvaModuleId): string {
      return fs.readFileSync(moduleId, 'utf8');
    }
  };
  resolver = {
    resolve(moduleId: EvaModuleId, from: EvaModuleId | null): EvaModuleId {
      if (path.isAbsolute(moduleId)) {
        return moduleId;
      }

      // get folder of from only if it is real directory
      const baseDir =
        from && path.isAbsolute(from) ?
          path.dirname(from) :
          process.cwd();
      
      // add extension .eva, if necessary
      const withExt =
        moduleId.endsWith(".eva") || moduleId.endsWith("/")
          ? moduleId
          : moduleId + ".eva";


      return path.resolve(baseDir, withExt);
    }
  };
}
