import {describe, expect, test} from "vitest";
import {testEval} from '../src/util/test-eval';

describe('self eval', () => {
  test('(var x 10)', () => {
    const result = testEval('(var x 10)');
    expect(result).toBe(10);
  });

  test('x', () => {
    const result = testEval('x');
    expect(result).toBe(10);
  });

  test('(var y 100)', () => {
    const result = testEval('(var y 100)');
    expect(result).toBe(100);
  });

  test('y', () => {
    const result = testEval('y');
    expect(result).toBe(100);
  });

  test('(var z (* 2 2))', () => {
    const result = testEval('(var z (* 2 2))');
    expect(result).toBe(4);
  });

  test('z', () => {
    const result = testEval('z');
    expect(result).toBe(4);
  });
});
