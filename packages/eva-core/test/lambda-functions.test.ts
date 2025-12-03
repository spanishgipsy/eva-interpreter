import {describe, expect, test} from "vitest";
import {testEval} from '../src/util/test-eval';

describe('lambda functions', () => {
  test('send lambda as callback param', () => {
    const result = testEval(`
      (begin
        (def onClick (callback)
          (begin
            (var x 10)
            (var y 20)
            (callback (+ x y))
          )
        )
        (onClick (lambda (data) (* data 10)))
      )
    `);
    expect(result).toBe(300);
  });

  test('immediately invoked lambda expression', () => {
    const result = testEval('((lambda (x) (* x x)) 2)');
    expect(result).toBe(4);
  });

  test('assign lambda to a variable', () => {
    const result = testEval(`
      (begin
        (var square (lambda (x) (* x x)))
        (square 2)
      )
    `);
    expect(result).toBe(4);
  });
});
