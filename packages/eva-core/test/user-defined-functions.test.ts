import {describe, expect, test} from "vitest";
import {testEval} from '../src/util/test-eval';

describe('user defined functions', () => {
  test('def function', () => {
    const result = testEval(`
      (begin
        (def square (x)
          (* x x)
        )
        (square 2)
      )
    `);
    expect(result).toBe(4);
  });

  test('closure: function returns function', () => {
    const result = testEval(`
      (begin
        (var value 100)
        (def calc (x y)
          (begin 
            (var z (+ x y))
            (def inner (foo)
              (+ (+ foo z) value)
            )
            inner
          )
        )
        (var fn (calc 10 20))
        (fn 30)
      )
    `);
    expect(result).toBe(160);
  });
});
