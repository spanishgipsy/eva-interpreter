const Eva = require('../Eva');

const tests = [
  require('./tests/global.test'),
  require('./tests/math.test'),
  require('./tests/self-eval.test'),
  require('./tests/variables.test'),
  require('./tests/block.test'),
  require('./tests/if.test'),
  require('./tests/while.test'),
  require('./tests/build-in-functions.test'),
  require('./tests/user-defined-functions.test'),
  require('./tests/lambda-functions.test'),
  require('./tests/terminator.test'),
  require('./tests/switch.test'),
  require('./tests/for-loop.test'),
  require('./tests/syntax-sugar.test'),
  require('./tests/class.test'),
  require('./tests/module.test'),
  require('./tests/import.test'),
];

const eva = new Eva();

tests.forEach(test => test(eva))

console.log('All assertions passed');

module.exports = tests;
