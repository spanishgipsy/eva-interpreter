import {describe, expect, test} from "vitest";
import {testEval} from '../src/util/test-eval';

describe('self eval', () => {
  test('1', () => {
    const result = testEval('1');
    expect(result).toBe(1);
  });

  test('"yo"', () => {
    const result = testEval('"yo"');
    expect(result).toBe('yo');
  });
});
