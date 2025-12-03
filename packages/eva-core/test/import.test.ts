import {beforeEach, describe, expect, test} from "vitest";
import {testEval, Eva} from "../src/index.js";
import {EvaHost, EvaModuleResolver, EvaModuleId, EvaFileSystem} from "../src/model/index.js";

export class MockEvaHost implements EvaHost {
  private mathModule = `
    (def abs (value) (if (< value 0) (- value) value))
    (def square (x) (* x x))
    (var MAX_VALUE 1000)
  `;

  private module2 = `
    (import Math ../Math)
    (var MAX_VALUE_SEPARATE (prop Math MAX_VALUE))
  `;

  private files = {
    '/<test>.eva/Math': this.mathModule,
    '/<test>.eva/sub/Mod': this.module2,
    '/<test>.eva/sub/Mod/../Math': this.mathModule,
  };

  fs: EvaFileSystem = {
    readFile: (moduleId: EvaModuleId): string =>  {
      const moduleSrc = this.files[moduleId];
      if (!moduleSrc) {
        throw Error(`No module with moduleId ${moduleId}`);
      }
      return this.files[moduleId] ?? '';
    }
  };
  resolver: EvaModuleResolver = {
    resolve: (spec: EvaModuleId, from: EvaModuleId): EvaModuleId => {
      return `${from}/${spec}`;
    }
  };
}

describe('import', () => {
  let eva: Eva;

  beforeEach(() => {
    eva = new Eva(new MockEvaHost());
  });

  test('use module function', () => {
    const result = testEval(`
      (begin  
        (import Math)
        ((prop Math abs) (- 10))
      )
    `, eva);
    expect(result).toBe(10);
  });

  test('assign module function to local variable', () => {
    const result = testEval(`
      (begin  
        (import Math)
        (var abs (prop Math abs))
        (abs (- 10))
      )
    `, eva);
    expect(result).toBe(10);
  });

  test('use module constant', () => {
    const result = testEval(`
      (begin  
        (import Math)
        (prop Math MAX_VALUE)
      )
    `, eva);
    expect(result).toBe(1000);
  });

  test('set module variable', () => {
    const result = testEval(`
      (begin  
        (import Math)
        (set (prop Math v) 123)
        (prop Math v)
      )
    `, eva);
    expect(result).toBe(123);
  });

  test('module with separate file name', () => {
    const result = testEval(`
      (begin  
        (import Mod sub/Mod)
        (prop Mod MAX_VALUE_SEPARATE)
      )
    `, eva);
    expect(result).toBe(1000);
  });
});
