import {generateAuthPatch} from './authorization/index';
import {replaceVariables} from './variables/index';
import {runLogic} from './logic/index';
import {buildPathSelector} from './utils/strings';
import * as JSONHelpers from './utils/json';

export default {
  generateAuthPatch,
  replaceVariables,
  runLogic,
  buildPathSelector,
  ...JSONHelpers,
};
