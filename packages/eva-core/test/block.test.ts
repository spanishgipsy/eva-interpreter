import {describe, expect, test} from 'vitest'
import {testEval} from "../src";

describe('block begin', () => {
  test('block creates its own environment, expression with 2 variables inside block to equal 230', () => {
    const result = testEval(`
    (begin
      (var x 10)
      (var y 20)
      (+ (* x y) 30)
    )
  `);
    expect(result).toBe(230);
  });

  test('block creates its own environment, inner x (20) should not affect outer x (10)', () => {
    const result = testEval(`
    (begin
      (var x 10)
      (begin
        (var x 20)
        x
      )
      x  
    )
  `);
    expect(result).toBe(10);
  });

  test('access variable from outer environment to equal 20', () => {
    const result = testEval(`
    (begin
      (var value 10)
      (var result
        (begin
          (var x (+ value 10))
        )
      )
      result
    )
  `);
    expect(result).toBe(20);
  });

  test('set value of variable from outer environment to equal 100', () => {
    const result = testEval(`
    (begin
      (var data 10)
      (begin (set data 100))
      data
    )
  `);
    expect(result).toBe(100);
  });
});
