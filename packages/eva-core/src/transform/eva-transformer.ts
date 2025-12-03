import {
  EvaBeginBlock,
  EvaDec,
  EvaDef,
  EvaFor,
  EvaIf,
  EvaInc,
  EvaStatement,
  EvaSwitch,
  EvaVariableAssign,
  EvaVariableDeclare
} from '../model/index.js';

export default class EvaTransformer {
  transformDefToVarLambda(defExp: EvaDef): EvaVariableDeclare {
    const [_tag, name, params, body] = defExp;
    return [EvaStatement.var, name, [EvaStatement.lambda, params, body]];
  }

  transformSwitchToIf(switchExp: EvaSwitch): EvaIf {
    const [_tag, ...cases] = switchExp;

    const ifExp = ['if'] as unknown as EvaIf;
    let current = ifExp;

    for (let i = 0; i < cases.length - 1; i++) {
      const [currentCond, currentBlock] = cases[i];
      current[1] = currentCond;
      current[2] = currentBlock;

      const next = cases[i + 1];
      const [nextCond, nextBlock] = next;

      current[3] = nextCond === 'else' ? nextBlock : ['if'] as unknown as EvaIf;
    }

    return ifExp;
  }

  transformForToBeginWhile(forExp: EvaFor): EvaBeginBlock {
    const [_tag, initialization, condition, modifier, body] = forExp;
    return [EvaStatement.begin,
      initialization,
      [EvaStatement.while,
        condition,
        [EvaStatement.begin,
          body,
          modifier,
        ],
      ],
    ];
  }

  transformIncToSetPlus([, variable]: EvaInc): EvaVariableAssign {
    return [EvaStatement.set, variable, [EvaStatement.plus, variable, 1]];
  }

  transformDecToSetMinus([, variable]: EvaDec): EvaVariableAssign {
    return [EvaStatement.set, variable, [EvaStatement.minus, variable, 1]];
  }
}
