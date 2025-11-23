import test from '../test-util';
import Eva from "../../eva";

export function testIf(eva: Eva) {
  test(eva, `
    (begin
      (var x 10)
      (var y 0)
      (if (> x 10) (set y 20) (set y 30))
    )
  `, 30);
}
