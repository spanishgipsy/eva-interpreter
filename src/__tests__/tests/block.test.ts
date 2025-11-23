import test from '../test-util';
import Eva from "../../eva";

export function testBlock (eva: Eva) {
  test(eva, `
    (begin
      (var x 10)
      (var y 20)
      (+ (* x y) 30))
  `, 230);

  test(eva, `
    (begin
      (var x 10)
      (begin
        (var x 20)
        x
      )
      x  
    )
  `, 10);

  test(eva, `
    (begin
      (var value 10)
      (var result
        (begin (var x (+ value 10))))
      result
    )
  `, 20);

  test(eva, `
    (begin
      (var data 10)
      (begin (set data 100))
      data
    )
  `, 100);

  test(eva, `
    (begin
      (var x 10.2)
      (var y 20)
      (+ (* x 10) y))
  `, 122);
}
