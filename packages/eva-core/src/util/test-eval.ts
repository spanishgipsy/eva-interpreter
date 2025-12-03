import evaParser from "eva-parser";
import Eva from "../eva.js";
import {EvaModuleId} from "../model/index.js";

export function testEval(code: string, eva = new Eva(), moduleId: EvaModuleId = '/<test>.eva') {
  const exp = evaParser.parse(code);
  return eva.eval(exp, { moduleId });
}
