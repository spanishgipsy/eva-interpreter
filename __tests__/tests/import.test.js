const testUtil = require('../test-util');

module.exports = eva => {
  testUtil.test(eva, `
    (begin  
      (import Math)
      ((prop Math abs) (- 10))
    )
  `, 10);

  testUtil.test(eva, `
    (begin  
      (import Math)
      (var abs (prop Math abs))
      (abs (- 10))
    )
  `, 10);

  testUtil.test(eva, `
    (begin  
      (import Math)
      ((prop Math abs) 1000)
    )
  `, 1000);
};
