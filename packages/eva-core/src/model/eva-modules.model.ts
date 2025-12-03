export type EvaModuleId = string;

export interface EvaFileSystem {
  readFile(moduleId: EvaModuleId): string;       // id is ready, without join/resolve
  // exists(moduleId: EvaModuleId): boolean; // TODO: implement or remove
}

export interface EvaModuleResolver {
  resolve(moduleId: string, from: EvaModuleId): EvaModuleId;
}

export interface EvaHost {
  fs: EvaFileSystem;
  resolver: EvaModuleResolver;
}

export class EvaNoopHost implements EvaHost {
  fs: EvaFileSystem = {
    readFile(moduleId: EvaModuleId): string {
      throw new ReferenceError('File system has not been  provided');
    }
  };
  resolver: EvaModuleResolver = {
    resolve(moduleId: EvaModuleId, from: EvaModuleId): EvaModuleId {
      throw new ReferenceError('Module name resolver has not been  provided');
    }
  };
}
