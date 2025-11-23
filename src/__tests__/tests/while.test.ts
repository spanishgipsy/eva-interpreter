import test from '../test-util';
import Eva from "../../eva";

export function testWhile(eva: Eva) {
  test(eva, `
    (begin
      (var counter 0)
      (var result 0)
      (while (< counter 10)
        (begin
          (set counter (+ counter 1))
          (set result (+ result 1))
        )
      )
      result
    )
  `, 10);
}
