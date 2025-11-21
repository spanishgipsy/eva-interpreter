const testUtil = require('../test-util');

module.exports = eva => {
  testUtil.test(eva, `
    (begin  
      (module Math
        (begin
          (def abs (value) (if (< value 0) (- value) value))
          (def square (x) (* x x))
          (var MAX_VALUE 1000)
        )
      )
      ((prop Math abs) (- 10))
    )
  `, 10);

  testUtil.test(eva, `
    (begin  
      (module Math
        (begin
          (def abs (value) (if (< value 0) (- value) value))
          (def square (x) (* x x))
          (var MAX_VALUE 1000)
        )
      )
      (var abs (prop Math abs))
      (abs (- 10))
    )
  `, 10);

  testUtil.test(eva, `
    (begin  
      (module Math
        (begin
          (def abs (value) (if (< value 0) (- value) value))
          (def square (x) (* x x))
          (var MAX_VALUE 1000)
        )
      )
      ((prop Math abs) 1000)
    )
  `, 1000);
};
