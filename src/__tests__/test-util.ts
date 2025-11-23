import assert from 'assert';
import evaParser from '../parser/evaParser.cjs';
import Eva from '../eva';

export default function test(eva: Eva, code: string, expected: any): void {
  const exp = evaParser.parse(code);
  assert.strictEqual(eva.eval(exp), expected);
}
