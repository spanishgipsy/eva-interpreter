import test from '../test-util';
import Eva from "../../eva";

export function testImport(eva: Eva) {
  test(eva, `
    (begin  
      (import Math)
      ((prop Math abs) (- 10))
    )
  `, 10);

  test(eva, `
    (begin  
      (import Math)
      (var abs (prop Math abs))
      (abs (- 10))
    )
  `, 10);

  test(eva, `
    (begin  
      (import Math)
      ((prop Math abs) 1000)
    )
  `, 1000);
}
