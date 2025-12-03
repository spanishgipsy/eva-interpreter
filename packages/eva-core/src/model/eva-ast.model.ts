import {EvaEnvironment} from './eva-environment.model.js';

export enum EvaStatement  {
  var = 'var',
  set = 'set',
  prop = 'prop',
  begin = 'begin',
  def = 'def',
  lambda = 'lambda',
  switch = 'switch',
  if = 'if',
  for = 'for',
  while = 'while',
  class = 'class',
  new = 'new',
  super = 'super',
  module = 'module',
  import = 'import',
  plus = '+',
  minus = '-',
  inc = '++',
  dec = '--',
}

export interface EvaLambdaFunction {
  params: string[];
  body: EvaCode;
  env: EvaEnvironment
}

export type EvaResultValue = number | string | boolean | null | EvaEnvironment | EvaLambdaFunction | Function;

export type EvaActivationRecord = Record<string, EvaResultValue>;

export type EvaString = `"${string}"`;
export type EvaCodePrimitive = number | string;
export type EvaVariableDeclare = [EvaStatement.var, string, EvaCode];
export type EvaProp = [EvaStatement.prop, string, string];
export type EvaVariableAssign = [EvaStatement.set, string | EvaProp, EvaCode];
export type EvaBeginBlock = [EvaStatement.begin, ...EvaCode[]];
export type EvaDef = [EvaStatement.def, string, string[], EvaCode];
export type EvaLambda = [EvaStatement.lambda, string[], EvaCode];
export type EvaSwitch = [EvaStatement.switch, ...[EvaCode, EvaCode][], ['else', EvaCode]];
export type EvaIf = [EvaStatement.if, EvaCode, EvaCode, EvaCode?];
export type EvaFor = [EvaStatement.for, EvaCode, EvaCode, EvaCode, EvaCode];
export type EvaWhile = [EvaStatement.while, EvaCode, EvaCode];
export type EvaClass = [EvaStatement.class, string, string, EvaBeginBlock];
export type EvaNew = [EvaStatement.new, string, ...EvaCode[]];
export type EvaSuper = [EvaStatement.super, string];
export type EvaModule = [EvaStatement.module, string, EvaBeginBlock];
export type EvaImport = [EvaStatement.import, string, string?];
export type EvaInc = [EvaStatement.inc, string];
export type EvaDec = [EvaStatement.dec, string];
export type EvaPlus = [EvaStatement.plus, EvaCode, EvaCode];
export type EvaMinus = [EvaStatement.minus, EvaCode, EvaCode];

export type EvaCode =
  | EvaCodePrimitive
  | EvaProp
  | EvaVariableDeclare
  | EvaVariableAssign
  | EvaBeginBlock
  | EvaDef
  | EvaLambda
  | EvaSwitch
  | EvaIf
  | EvaFor
  | EvaWhile
  | EvaClass
  | EvaNew
  | EvaSuper
  | EvaModule
  | EvaImport
  | EvaInc
  | EvaDec
  | EvaPlus
  | EvaMinus
  ;
