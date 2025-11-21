const { test } = require('../test-util');

module.exports = eva => {
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
};
