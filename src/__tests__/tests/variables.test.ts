import test from '../test-util';
import Eva from "../../eva";

export function testVariables(eva: Eva) {
  test(eva, '(var x 10)', 10);
  test(eva, 'x', 10);
  test(eva, '(var y 100)', 100);
  test(eva, 'y', 100);
  test(eva, '(var z (* 2 2))', 4);
  test(eva, 'z', 4);
}
