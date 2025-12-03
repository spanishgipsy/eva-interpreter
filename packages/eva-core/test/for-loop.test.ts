import {describe, expect, test} from "vitest";
import {testEval} from '../src/util/test-eval';

describe('for loop', () => {
  test('for loop', () => {
    const result = testEval(`
      (begin
        (var result 0)
        (for
          (var x 3)
          (> x 0)
          (-- x)
          (set result (+ result 10))
        )
        result
      )
    `);
    expect(result).toBe(30);
  });
});
