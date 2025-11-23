import Eva from '../eva';
import * as tests from './tests';

const eva = new Eva();

Object.values(tests).forEach(
  (testFn) => testFn(eva)
);

console.log('All assertions passed');
