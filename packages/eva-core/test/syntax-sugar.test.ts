import {describe, expect, test} from "vitest";
import {testEval} from '../src/util/test-eval';

describe('syntax sugar', () => {
  test('++ (inc)', () => {
    const result = testEval('(begin (var x 5) (++ x))');
    expect(result).toBe(6);
  });

  test('-- (dec)', () => {
    const result = testEval('(begin (var x 5) (-- x))');
    expect(result).toBe(4);
  });
});
