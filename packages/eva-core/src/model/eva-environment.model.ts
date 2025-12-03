import { EvaActivationRecord, EvaResultValue } from './eva-ast.model.js';
import {EvaModuleId} from "./eva-modules.model.js";

export class EvaEnvironment {
  constructor(
    public readonly record: EvaActivationRecord = {},
    public readonly parent: EvaEnvironment | null = null,
  ) {}

  define<T extends EvaResultValue>(name: string, value: T): T {
    if (name === this.MODULE_ID) {
      throw TypeError(`Variable "${this.MODULE_ID}" is readonly`);
    }
    return this.defineVariable(name, value);
  }

  assign<T extends EvaResultValue>(name: string, value: T): T {
    if (name === this.MODULE_ID) {
      throw TypeError(`Variable "${this.MODULE_ID}" is readonly`);
    }
    this.resolve(name).record[name] = value;
    return value;
  }

  lookup(name: string): EvaResultValue {
    return this.resolve(name).record[name];
  }

  resolve(name: string): EvaEnvironment {
    if (this.record.hasOwnProperty(name)) {
      return this;
    }

    if (this.parent === null) {
      throw new ReferenceError(`Variable "${name}" is not defined`);
    }

    return this.parent.resolve(name);
  }

  setModuleId(moduleId: EvaModuleId) {
    this.defineVariable(this.MODULE_ID, moduleId);
  }

  getModuleId(): EvaModuleId {
    return this.lookup(this.MODULE_ID) as EvaModuleId;
  }

  private defineVariable<T extends EvaResultValue>(name: string, value: T): T {
    this.record[name] = value;
    return value;
  }

  private readonly MODULE_ID = '[[MODULE_ID]]';
}
