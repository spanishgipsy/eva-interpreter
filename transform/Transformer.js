class Transformer {
  transformDefToVarLambda(defExp) {
    const [_tag, name, params, body] = defExp;
    return ['var', name, ['lambda', params, body]];
  }

  transformSwitchToIf(switchExp) {
    const [_tag, ...cases] = switchExp;

    const ifExp = ['if', null, null, null];
    let current = ifExp

    for (let i = 0; i < cases.length - 1; i++) {
      const [currentCond, currentBlock] = cases[i];
      current[1] = currentCond;
      current[2] = currentBlock;

      const next = cases[i + 1];
      const [nextCond, nextBlock] = next;

      current[3] = nextCond === 'else' ? nextBlock : ['if'];
    }

    return ifExp;
  }

  transformForToWhile(forExp) {
    const [_tag, initialization, condition, modifier, body] = forExp;
    return ['begin',
      initialization,
      ['while',
        condition,
        ['begin',
          body,
          modifier,
        ],
      ],
    ];
  }

  transformIncToSetPlus(incExp) {
    const [_tag, variable] = incExp;
    return ['set', variable, ['+', variable, 1]];
  }

  transformDecToSetMinus(decExp) {
    const [_tag, variable] = decExp;
    return ['set', variable, ['-', variable, 1]];
  }

  transformMoreEqualToIf(moreEqualExp) {
    const [_tag, op1, op2] = moreEqualExp;
    return ['if',
              ['>', op1, op2],
              'true', // todo: need to understand why we should use here true as string
              ['if',
                  ['=', op1, op2],
                  'true',
                  'false',
              ],
    ];
  }

  transformLessEqualToIf(lessEqualExp) {
    const [_tag, op1, op2] = lessEqualExp;
    return ['if',
      ['<', op1, op2],
      'true',
      ['if',
        ['=', op1, op2],
        'true',
        'false',
      ],
    ];
  }
}

module.exports = Transformer;
