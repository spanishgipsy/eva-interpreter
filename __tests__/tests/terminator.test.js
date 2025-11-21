const { test } = require('../test-util');

module.exports = eva => {
  test(eva, `
    (begin    
      (var scale 1)
      (def printRow (row)
        (begin
          (if (= row 0) (print "TTTT EEEEE RRRR  M   M  I  N   N  A   TTTTT  OOO  RRRR "))
          (if (= row 1) (print "  T  E     R   R MM MM  I  NN  N A A    T   O   O R   R"))
          (if (= row 2) (print "  T  EEEE  RRRR  M M M  I  N N N AAA    T   O   O RRRR "))
          (if (= row 3) (print "  T  E     R R   M   M  I  N  NN A  A   T   O   O R R  "))
          (if (= row 4) (print "  T  EEEEE R  RR M   M  I  N   N A  A   T    OOO  R  RR"))
        )
      )  
      (for (var row 0) (< row 5) (++ row)
        (for (var k 0) (< k scale) (++ k)
          (printRow row)
        )
      )
    )
  `, 5);
};
