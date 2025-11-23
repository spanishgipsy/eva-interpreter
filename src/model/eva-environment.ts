import { EvaActivationRecord, EvaResultValue } from './eva-model';

export default class EvaEnvironment {
  constructor(
    public readonly record: EvaActivationRecord = {},
    public readonly parent: EvaEnvironment | null = null,
  ) {}

  define<T extends EvaResultValue>(name: string, value: T): T {
    this.record[name] = value;
    return value;
  }

  assign<T extends EvaResultValue>(name: string, value: T): T {
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
}
