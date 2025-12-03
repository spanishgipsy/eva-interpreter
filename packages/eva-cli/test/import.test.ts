import {beforeEach, describe, expect, test} from "vitest";
import {Eva, testEval} from "eva-core";
import {EvaCliHost} from "../src/eva-cli-host";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);

describe('import from file (node)', () => {
  let eva: Eva;

  beforeEach(() => {
    eva = new Eva(new EvaCliHost());
  });

  test('use module function', () => {
    const result = testEval(`
      (begin
        (import Math fixtures/Math)
        ((prop Math abs) (- 10))
      )
    `, eva, __filename);
    expect(result).toBe(10);
  });

  test('assign module function to local variable', () => {
    const result = testEval(`
      (begin  
        (import Math fixtures/Math)
        (var abs (prop Math abs))
        (abs (- 10))
      )
    `, eva, __filename);
    expect(result).toBe(10);
  });

  test('use module constant', () => {
    const result = testEval(`
      (begin  
        (import Math fixtures/Math)
        (prop Math MAX_VALUE)
      )
    `, eva, __filename);
    expect(result).toBe(1000);
  });

  test('set module variable', () => {
    const result = testEval(`
      (begin  
        (import Math fixtures/Math)
        (set (prop Math v) 123)
        (prop Math v)
      )
    `, eva, __filename);
    expect(result).toBe(123);
  });
});
