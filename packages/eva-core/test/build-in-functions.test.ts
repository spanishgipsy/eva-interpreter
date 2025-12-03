import {describe, expect, test} from "vitest";
import {testEval} from '../src/util/test-eval';

describe('built-in functions', () => {
  test('(+ 10 5)', () => {
    const result = testEval('(+ 10 5)');
    expect(result).toBe(15);
  });

  test('(- 10 5)', () => {
    const result = testEval('(- 10 5)');
    expect(result).toBe(5);
  });

  test('(* 10 5)', () => {
    const result = testEval('(* 10 5)');
    expect(result).toBe(50);
  });

  test('(/ 10 5)', () => {
    const result = testEval('(/ 10 5)');
    expect(result).toBe(2);
  });

  test('(> 10 5)', () => {
    const result = testEval('(> 10 5)');
    expect(result).toBe(true);
  });

  test('(< 10 5)', () => {
    const result = testEval('(< 10 5)');
    expect(result).toBe(false);
  });

  test('(= 10 5)', () => {
    const result = testEval('(= 10 5)');
    expect(result).toBe(false);
  });

  test('(= 5 5)', () => {
    const result = testEval('(= 5 5)');
    expect(result).toBe(true);
  });

  test('(or true true)', () => {
    const result = testEval('(or true true)');
    expect(result).toBe(true);
  });

  test('(or true false)', () => {
    const result = testEval('(or true false)');
    expect(result).toBe(true);
  });

  test('(or false true)', () => {
    const result = testEval('(or false true)');
    expect(result).toBe(true);
  });

  test('(or false false)', () => {
    const result = testEval('(or false false)');
    expect(result).toBe(false);
  });

  test('(and true true)', () => {
    const result = testEval('(and true true)');
    expect(result).toBe(true);
  });

  test('(and true false)', () => {
    const result = testEval('(and true false)');
    expect(result).toBe(false);
  });

  test('(and false true)', () => {
    const result = testEval('(and false true)');
    expect(result).toBe(false);
  });

  test('(and false false)', () => {
    const result = testEval('(and false false)');
    expect(result).toBe(false);
  });

  test('(not true)', () => {
    const result = testEval('(not true)');
    expect(result).toBe(false);
  });

  test('(not false)', () => {
    const result = testEval('(not false)');
    expect(result).toBe(true);
  });
});
