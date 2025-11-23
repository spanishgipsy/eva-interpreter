import test from '../test-util';
import Eva from "../../eva";

export function testMath (eva: Eva) {
  test(eva, '(+ 10 5)', 15);
  test(eva, '(- 10 5)', 5);
  test(eva, '(* 10 5)', 50);
  test(eva, '(/ 10 5)', 2);
  test(eva, '(> 10 5)', true);
  test(eva, '(< 10 5)', false);
  test(eva, '(= 10 5)', false);
  test(eva, '(= 5 5)', true);
}
