import {describe, expect, test} from "vitest";
import {testEval} from '../src/util/test-eval';

describe('if', () => {
  test('if', () => {
    const result = testEval(`
      (begin
        (var x 10)
        (var y 0)
        (if (> x 10) (set y 20) (set y 30))
      )
    `);
    expect(result).toBe(30);
  });
});
