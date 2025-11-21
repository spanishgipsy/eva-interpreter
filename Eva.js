const fs = require('fs');
const Environment = require('./Environment');
const GLOBAL_ENVIRONMENT = require('./GLOBAL_ENVIRONMENT');
const Transformer = require('./transform/Transformer');
const evaParser = require('./parser/evaParser');

class Eva {
  constructor(global = GLOBAL_ENVIRONMENT) {
    this.global = global;
    this._transformer = new Transformer();
    this._modulesCache = {};
  }

  // TODO: fix using the global eval
  evalGlobal(exp) {
    return this._evalBlock(exp, this.global);
  }

  eval(exp, env = this.global) {
    // self-evaluating operators:
    if (this._isNumber(exp)) {
      return exp;
    }
    if (this._isString(exp)) {
      return exp.slice(1, -1);
    }
    // variable access
    if (this._isVariableName(exp)) {
      return env.lookup(exp);
    }

    // variable declaration
    if (exp[0] === 'var') {
      const [_, name, value] = exp;
      return env.define(name, this.eval(value, env));
    }
    // variable assign
    if (exp[0] === 'set') {
      const [_, ref, value] = exp;
      if (ref[0] === 'prop') {
        const [_tag, instance, propName] = ref;
        const instanceEnv = this.eval(instance, env);
        return instanceEnv.define(propName, this.eval(value, env));
      }
      return env.assign(ref, this.eval(value, env));
    }
    // blocks
    if (exp[0] === 'begin') {
      const blockEnv = new Environment({}, env);
      return this._evalBlock(exp, blockEnv);
    }
    // switch statement
    if (exp[0] === 'switch') {
      const ifExp = this._transformer.transformSwitchToIf(exp);
      return this.eval(ifExp, env);
    }
    // if statement
    if (exp[0] === 'if') {
      const [_tag, condition, consequent, alternate = null] = exp;
      if (this.eval(condition, env)) {
        return this.eval(consequent, env);
      } else if (alternate !== null) {
        return this.eval(alternate, env);
      }
      return null;
    }
    if (exp[0] === 'for') {
      const forExp = this._transformer.transformForToWhile(exp);
      return this.eval(forExp, env);
    }
    // while cycle
    if (exp[0] === 'while') {
      const [_tag, condition, body] = exp;
      let result;
      while (this.eval(condition, env)) {
        result = this.eval(body, env);
      }
      return result;
    }
    // function declaration
    if (exp[0] === 'def') {
      const varExp = this._transformer.transformDefToVarLambda(exp);
      return this.eval(varExp, env);
    }
    // lambda functions
    if (exp[0] === 'lambda') {
      const [_tag, params, body] = exp;
      return {
        params,
        body,
        env,
      };
    }

    if (exp[0] === 'class') {
      const [_tag, name, parent, body] = exp;

      const parentEnv = this.eval(parent, env) || env;
      const classEnv = new Environment({}, parentEnv);

      this._evalBlock(body, classEnv);

      return env.define(name, classEnv);
    }

    if (exp[0] === 'new') {
      const classEnv = this.eval(exp[1], env);
      const instanceEnv = new Environment({}, classEnv);
      const args = exp.slice(2).map(arg => this.eval(arg, env));
      this._callUserDefinedFunc(classEnv.lookup('constructor'), [instanceEnv, ...args]);
      return instanceEnv;
    }

    if (exp[0] === 'prop') {
      const [_tag, instance, name] = exp;
      const instanceEnv = this.eval(instance, env);
      return instanceEnv.lookup(name);
    }

    if (exp[0] === 'super') {
      const [_tag, className] = exp;
      return this.eval(className, env).parent;
    }

    if (exp[0] === 'module') {
      const [_tag, name, body] = exp;
      const moduleEnv = new Environment({}, env);
      this._evalBlock(body, moduleEnv);
      return env.define(name, moduleEnv);
    }

    if (exp[0] === 'import') {
      const [_tag, name] = exp;
      if (!this._modulesCache[name]) {
        this._modulesCache[name] = this._loadModule(name);
      }
      return this.eval(this._modulesCache[name], this.global);
    }

    if (exp[0] === '++') {
      const setPlusExp = this._transformer.transformIncToSetPlus(exp);
      return this.eval(setPlusExp, env);
    }

    if (exp[0] === '--') {
      const setPlusExp = this._transformer.transformDecToSetMinus(exp);
      return this.eval(setPlusExp, env);
    }

    if (exp[0] === '>=') {
      const setPlusExp = this._transformer.transformMoreEqualToIf(exp);
      return this.eval(setPlusExp, env);
    }

    if (exp[0] === '<=') {
      const setPlusExp = this._transformer.transformLessEqualToIf(exp);
      return this.eval(setPlusExp, env);
    }

    // function execution
    if (Array.isArray(exp)) {
      const fn = this.eval(exp[0], env);
      const args = exp.slice(1).map(arg => this.eval(arg, env));

      // 1. native functions
      if (typeof fn === 'function') {
        return fn(...args);
      }
      // 2. user defined functions
      return this._callUserDefinedFunc(fn, args);
    }

    throw ('Unimplemented: ' + exp.toString());
  }

  _loadModule(name) {
    const moduleSrc = fs.readFileSync(`${__dirname}/modules/${name}.eva`, 'utf8');
    const body = evaParser.parse(`(begin ${moduleSrc})`);
    return ['module', name, body];
  }

  _callUserDefinedFunc(fn, args) {
    const activationRecord = fn.params.reduce((ar, param, i) => ({ ...ar, [param]: args[i]}), {});
    const activationEnv = new Environment(activationRecord, fn.env);
    return this._evalBody(fn.body, activationEnv);
  }

  _evalBody(body, env) {
    if (body[0] === 'begin') {
      return this._evalBlock(body, env);
    }
    return this.eval(body, env);
  }

  _evalBlock(block, env) {
    let result;
    const [_tag, ...expressions] = block;
    expressions.forEach(exp => result = this.eval(exp, env));
    return result;
  }

  _isNumber(exp) {
    return typeof exp === 'number';
  }

  _isString(exp) {
    return typeof exp === 'string' && exp.startsWith('"') && exp.endsWith('"');
  }

  _isVariableName(exp) {
    return typeof exp === 'string' && /^([+\-*/<>=]|[a-zA-Z][a-zA-Z_0-9]*)$/.test(exp);
  }
}

module.exports = Eva;
