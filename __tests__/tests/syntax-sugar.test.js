const { test } = require('../test-util');

module.exports = eva => {
  test(eva, '(begin (var x 5) (++ x))', 6);
  test(eva, '(begin (var x 5) (-- x))', 4);

  test(eva, '(<= 5 5)', true);
  // test(eva, '(<= 6 5)', false);
  // test(eva, '(<= 4 5)', true);
  test(eva, '(>= 5 5)', true);
  // test(eva, '(>= 6 5)', true);
  // test(eva, '(>= 4 5)', false);
};
