import test from '../test-util';
import Eva from "../../eva";

export function testSwitch(eva: Eva) {
  test(eva, `
    (begin
      (var x 10)
      (switch
        ((< x 10) 100)
        ((> x 10) 200)
        (else 300)
      )
    )
  `, 300);
}
