const testUtil = require('../test-util');

module.exports = eva => {
  testUtil.test(eva, 'VERSION', '0.1');
  testUtil.test(eva, '(var isUser true)', true);
  testUtil.test(eva, '(print "AAA" isUser "you")', undefined);
};
