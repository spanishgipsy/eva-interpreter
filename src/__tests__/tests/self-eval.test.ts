import test from '../test-util';
import Eva from "../../eva";

export function testSelfEval(eva: Eva) {
  test(eva, '1', 1);
  test(eva, '"hello"', 'hello');
}
