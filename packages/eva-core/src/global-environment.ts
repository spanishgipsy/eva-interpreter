import {EvaEnvironment} from './model/index.js';

const GLOBAL_ENVIRONMENT = new EvaEnvironment({
  null: null,
  true: true,
  false: false,
  VERSION: '0.1',

  // math operators

  // TODO: add types here
  '+' (op1, op2) {
    return op1 + op2;
  },

  '-' (op1, op2 = null) {
    if (op2 === null) {
      return -op1;
    }
    return op1 - op2;
  },

  '*' (op1, op2) {
    return op1 * op2;
  },

  '/' (op1, op2) {
    return op1 / op2;
  },

  // comparison operators

  '>' (op1, op2) {
    return op1 > op2;
  },

  '>=' (op1, op2) {
    return op1 >= op2;
  },

  '<' (op1, op2) {
    return op1 < op2;
  },

  '<=' (op1, op2) {
    return op1 <= op2;
  },

  '=' (op1, op2) {
    return op1 === op2;
  },

  '!=' (op1, op2) {
    return op1 !== op2;
  },

  // logical operators

  'or' (op1, op2) {
    return op1 || op2;
  },

  'and' (op1, op2) {
    return op1 && op2;
  },

  'not' (op1) {
    return !op1;
  },

  print(...args) {
    console.log(...args);
  },

  concat(...args): string {
    return args.join(' ');
  }
});

export default GLOBAL_ENVIRONMENT;
