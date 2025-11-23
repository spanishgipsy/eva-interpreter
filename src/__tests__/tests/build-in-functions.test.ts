import test from '../test-util';
import Eva from "../../eva";

export function testBuildInFunctions(eva: Eva) {
  test(eva, '(+ 10 5)', 15);
  test(eva, '(- 10 5)', 5);
  test(eva, '(* 10 5)', 50);
  test(eva, '(/ 10 5)', 2);
  test(eva, '(> 10 5)', true);
  test(eva, '(< 10 5)', false);
  test(eva, '(= 10 5)', false);
  test(eva, '(= 5 5)', true);
  test(eva, '(or true true)', true);
  test(eva, '(or true false)', true);
  test(eva, '(or false true)', true);
  test(eva, '(or false false)', false);
  test(eva, '(and true true)', true);
  test(eva, '(and true false)', false);
  test(eva, '(and false true)', false);
  test(eva, '(and false false)', false);
  test(eva, '(not true)', false);
  test(eva, '(not false)', true);

}
