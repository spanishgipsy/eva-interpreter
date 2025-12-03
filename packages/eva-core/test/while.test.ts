import {describe, expect, test} from "vitest";
import {testEval} from '../src/util/test-eval';

describe('while', () => {
  test('while', () => {
    const result = testEval(`
      (begin
        (var counter 0)
        (var result 0)
        (while (< counter 10)
          (begin
            (set counter (+ counter 1))
            (set result (+ result 1))
          )
        )
        result
      )
    `);
    expect(result).toBe(10);
  });
});

