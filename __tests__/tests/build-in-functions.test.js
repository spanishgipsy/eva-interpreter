const { test } = require('../test-util');

module.exports = eva => {
  test(eva, `(- 3 2)`, 1);
  test(eva, `(+ (+ 3 2) 5)`, 10);
  test(eva, `(* 3 2)`, 6);
  test(eva, `(/ 10 2)`, 5);

  test(eva, `(> 10 2)`, true);
  test(eva, `(< 10 2)`, false);
};
