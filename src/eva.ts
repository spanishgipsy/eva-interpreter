import EvaEnvironment from './model/eva-environment';
import GLOBAL_ENVIRONMENT from './global-environment';
import EvaTransformer from './transform/eva-transformer';

import {
  EvaBeginBlock,
  EvaClass,
  EvaCode,
  EvaDec,
  EvaDef,
  EvaFor,
  EvaIf,
  EvaImport,
  EvaInc,
  EvaLambda,
  EvaLambdaFunction,
  EvaModule,
  EvaNew,
  EvaProp,
  EvaResultValue,
  EvaStatement,
  EvaString,
  EvaSuper,
  EvaSwitch,
  EvaVariableAssign,
  EvaVariableDeclare,
  EvaWhile,
} from './model/eva-model';
import EvaModuleResolver from "./modules/module-resolver";

// TODO:
//   1. add strict mode
//   2. add environment name to environment
//   3. (var base (object (value 100)))
//   4. (object (x 10) (y 20) (__proto__ base))
//   5. (var values (list 42 "Hello"))
//   6. (prop values 0) or (idx values 0)
//   7. (def async getValues (x) ...)


export default class Eva {
  private readonly transformer = new EvaTransformer();
  private readonly moduleResolver  = new EvaModuleResolver();

  constructor(private readonly global = GLOBAL_ENVIRONMENT) {}

  eval(exp: EvaCode, env = this.global): EvaResultValue {
    // self-evaluating operators:
    if (this.isNumber(exp)) {
      return exp;
    }
    if (this.isString(exp)) {
      return exp.slice(1, -1);
    }
    // variable access
    if (this.isVariableName(exp)) {
      return env.lookup(exp);
    }

    const statement = exp[0];

    switch(statement) {
      case EvaStatement.var:
        return this.declareVariable(exp, env);
      case EvaStatement.set:
        return this.assignVariable(exp, env);
      case EvaStatement.begin:
        return this.beginBlock(exp, env);
      // branches
      case EvaStatement.switch:
        return this.switch(exp, env);
      case EvaStatement.if:
        return this.if(exp, env);
      // loops
      case EvaStatement.for:
        return this.for(exp, env);
      case EvaStatement.while:
        return this.while(exp, env);
      // functions
      case EvaStatement.def:
        return this.def(exp, env);
      case EvaStatement.lambda:
        return this.lambda(exp, env);
      // classes
      case EvaStatement.class:
        return this.class(exp, env);
      case EvaStatement.new:
        return this.new(exp, env);
      case EvaStatement.prop:
        return this.prop(exp, env);
      case EvaStatement.super:
        return this.super(exp, env);
      // modules
      case EvaStatement.module:
        return this.module(exp, env);
      case EvaStatement.import:
        return this.import(exp, env);
      // syntax sugar
      case EvaStatement.inc:
        return this.inc(exp, env);
      case EvaStatement.dec:
        return this.dec(exp, env);
    }

    // function execution
    if (Array.isArray(exp)) {
      // TODO: fix types -- add specific types here
      const fn = this.eval(statement, env) as EvaLambdaFunction | Function;
      const args = exp.slice(1).map(arg => this.eval(arg, env));

      // 1. native functions
      if (typeof fn === 'function') {
        return fn(...args);
      }
      // 2. user defined functions
      return this.callUserDefinedFunc(fn, args);
    }

    throw (new ReferenceError('Unimplemented: ' + (exp as unknown).toString()));
  }

  private declareVariable([, name, value]: EvaVariableDeclare, env: EvaEnvironment): EvaResultValue {
    return env.define(name, this.eval(value, env));
  }

  private assignVariable([, ref, value]: EvaVariableAssign, env: EvaEnvironment): EvaResultValue {
    if (ref[0] === EvaStatement.prop) {
      const [, instanceName, propName] = ref;
      const instanceEnv = this.eval(instanceName, env) as EvaEnvironment;
      return instanceEnv.define(propName, this.eval(value, env));
    }
    return env.assign(ref as string, this.eval(value, env));
  }

  private beginBlock(exp: EvaBeginBlock, env : EvaEnvironment): EvaResultValue {
    const blockEnv = new EvaEnvironment({}, env);
    return this.evalBlock(exp, blockEnv);
  }

  private switch(exp: EvaSwitch, env : EvaEnvironment): EvaResultValue {
    const ifExp = this.transformer.transformSwitchToIf(exp);
    return this.eval(ifExp, env);
  }

  private if([, condition, consequent, alternate]: EvaIf, env : EvaEnvironment): EvaResultValue {
    if (this.eval(condition, env)) {
      return this.eval(consequent, env);
    } else if (alternate != null) {
      return this.eval(alternate, env);
    }
    return null;
  }

  private for(exp: EvaFor, env : EvaEnvironment): EvaResultValue {
    const forExp = this.transformer.transformForToBeginWhile(exp);
    return this.eval(forExp, env);
  }

  private while([, condition, body]: EvaWhile, env : EvaEnvironment): EvaResultValue {
    let result: EvaResultValue = null;
    while (this.eval(condition, env)) {
      result = this.eval(body, env);
    }
    return result;
  }

  private def(exp: EvaDef, env : EvaEnvironment) {
    const varExp = this.transformer.transformDefToVarLambda(exp);
    return this.eval(varExp, env);
  }

  private lambda([, params, body]: EvaLambda, env : EvaEnvironment): EvaLambdaFunction {
    return {
      params,
      body,
      env,
    };
  }

  private class([, name, parentName, body]: EvaClass, env : EvaEnvironment): EvaEnvironment {
    const parentEnv = this.eval(parentName, env) as EvaEnvironment || env;
    const classEnv = new EvaEnvironment({}, parentEnv);
    this.evalBlock(body, classEnv);
    return env.define(name, classEnv);
  }

  private new([, className, ...params]: EvaNew, env : EvaEnvironment): EvaEnvironment {
    const classEnv = this.eval(className, env) as EvaEnvironment;
    const instanceEnv = new EvaEnvironment({}, classEnv);
    const args = params.map(arg => this.eval(arg, env));
    const constructorFunc = classEnv.lookup('constructor') as EvaLambdaFunction;
    this.callUserDefinedFunc(constructorFunc, [instanceEnv, ...args]);
    return instanceEnv;
  }

  private prop([, instance, name]: EvaProp, env: EvaEnvironment): EvaResultValue {
    const instanceEnv = this.eval(instance, env) as EvaEnvironment;
    return instanceEnv.lookup(name);
  }

  private super([, className]: EvaSuper, env: EvaEnvironment): EvaEnvironment | null {
    const classEnv = this.eval(className, env) as EvaEnvironment;
    return classEnv.parent;
  }

  private module([, name, body]: EvaModule, env: EvaEnvironment): EvaEnvironment {
    const moduleEnv = new EvaEnvironment({}, env);
    this.evalBlock(body, moduleEnv);
    return env.define(name, moduleEnv);
  }

  private import([, name]: EvaImport, env: EvaEnvironment): EvaEnvironment {
    const moduleBody = this.moduleResolver.getOrLoadModule(name);
    const module: EvaModule  = [EvaStatement.module, name, moduleBody];
    return this.eval(module, this.global) as EvaEnvironment;
  }

  private inc(exp: EvaInc, env: EvaEnvironment): EvaResultValue {
    const setIncExp = this.transformer.transformIncToSetPlus(exp);
    return this.eval(setIncExp, env);
  }

  private dec(exp: EvaDec, env: EvaEnvironment): EvaResultValue {
    const setDecExp = this.transformer.transformDecToSetMinus(exp);
    return this.eval(setDecExp, env);
  }

  private callUserDefinedFunc(fn: EvaLambdaFunction, args: EvaResultValue[]): EvaResultValue {
    const activationRecord = fn.params.reduce((ar, param, i) => ({ ...ar, [param]: args[i]}), {});
    const activationEnv = new EvaEnvironment(activationRecord, fn.env);
    return this.evalBody(fn.body, activationEnv);
  }

  private evalBody(body: EvaCode, env: EvaEnvironment): EvaResultValue {
    if (body[0] === EvaStatement.begin) {
      return this.evalBlock(body, env);
    }
    return this.eval(body, env);
  }

  private evalBlock(block: EvaCode[], env: EvaEnvironment): EvaResultValue {
    let result: EvaResultValue = null;
    const [, ...expressions] = block;
    expressions.forEach(exp => result = this.eval(exp, env));
    return result;
  }

  private isNumber(exp: EvaCode): exp is number {
    return typeof exp === 'number';
  }

  private isString(exp: EvaCode): exp is EvaString {
    return typeof exp === 'string' && exp.startsWith('"') && exp.endsWith('"');
  }

  private isVariableName(exp: EvaCode): exp is string {
    return typeof exp === 'string' && /^(!=|>=|<=|[+\-*/<>=]|[a-zA-Z][a-zA-Z_0-9]*)$/.test(exp);
  }
}
