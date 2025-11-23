import test from '../test-util';
import Eva from "../../eva";

export function testGlobal (eva: Eva) {
  test(eva, 'VERSION', '0.1');
  test(eva, '(var isUser true)', true);
  test(eva, '(print "AAA" isUser "you")', undefined);
};
