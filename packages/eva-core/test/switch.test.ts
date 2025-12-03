import {describe, expect, test} from "vitest";
import {testEval} from '../src/util/test-eval';

describe('switch', () => {
  test('switch', () => {
    const result = testEval(`
      (begin
        (var x 10)
        (switch
          ((< x 10) 100)
          ((> x 10) 200)
          (else 300)
        )
      )
    `);
    expect(result).toBe(300);
  });
});
