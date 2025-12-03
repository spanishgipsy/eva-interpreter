import {describe, expect, test} from "vitest";
import {testEval} from '../src/util/test-eval';

describe('built-in functions', () => {
  test('VERSION', () => {
    const result = testEval('VERSION');
    expect(result).toBe('0.1');
  });

  test('(var isUser true)', () => {
    const result = testEval('(var isUser true)');
    expect(result).toBe(true);
  });

  test('(print "AAA" isUser "you")', () => {
    const result = testEval('(print "AAA" isUser "you")');
    expect(result).toBeUndefined();
  });
});
