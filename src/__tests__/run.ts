import Eva from '../eva';
import {
  testBlock,
  testBuildInFunctions,
  testClass,
  testGlobal,
  testMath,
  testSelfEval,
  testVariables,
  testIf,
  testWhile,
  testUserDefinedFunctions,
  testLambdaFunctions,
  testTerminator,
  testSwitch,
  testForLoop,
  testSyntaxSugar,
  testModule,
  testImport,
} from './tests';

const tests = [
  testGlobal,
  testMath,
  testSelfEval,
  testVariables,
  testBlock,
  testIf,
  testWhile,
  testBuildInFunctions,
  testUserDefinedFunctions,
  testLambdaFunctions,
  testTerminator,
  testSwitch,
  testForLoop,
  testSyntaxSugar,
  testClass,
  testModule,
  testImport,
];

const eva = new Eva();

tests.forEach(test => test(eva))

console.log('All assertions passed');
