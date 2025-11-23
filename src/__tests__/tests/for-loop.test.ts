import test from '../test-util';
import Eva from "../../eva";

export function testForLoop(eva: Eva) {
  test(eva, `
    (begin
      (var result 0)
      (for
        (var x 3)
        (> x 0)
        (set x (- x 1))
        (set result (+ result 10))
      )
      result
    )
  `, 30);
}
