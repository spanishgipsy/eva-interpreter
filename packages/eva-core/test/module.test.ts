import {describe, expect, test} from "vitest";
import {testEval} from '../src/util/test-eval';

describe('module', () => {
  test('use module function', () => {
    const result = testEval(`
      (begin  
        (module Math
          (begin
            (def abs (value) (if (< value 0) (- value) value))
          )
        )
        ((prop Math abs) (- 10))
      )
    `);
    expect(result).toBe(10);
  });

  test('assign module function to local variable', () => {
    const result = testEval(`
      (begin  
        (module Math
          (begin
            (def abs (value) (if (< value 0) (- value) value))
          )
        )
        (var abs (prop Math abs))
        (abs (- 10))
      )
    `);
    expect(result).toBe(10);
  });

  test('use module constant', () => {
    const result = testEval(`
      (begin  
        (module Math
          (begin
            (var MAX_VALUE 1000)
          )
        )
        (prop Math MAX_VALUE)
      )
    `);
    expect(result).toBe(1000);
  });

  test('set module variable', () => {
    const result = testEval(`
      (begin  
        (module Math
          (begin
            (var v 1000)
          )
        )
        (set (prop Math v) 123)
      )
    `);
    expect(result).toBe(123);
  });
});
