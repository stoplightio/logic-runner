import isFunction from 'lodash/isFunction';

import * as Logic from '../logic/index';
import * as JSONHelpers from '../utils/json';

export const runNode = (node, options) => {
  if (!node) {
    return {};
  }

  // TODO: Figure out Scenario Results
  const result = {
    'status': 'running',
  };

  Logic.runLogic(result, node, 'before', options);
  if (node.input && isFunction(node.input.invoke)) {
    result.input = node.input;
    // result.output = node.input.invoke(_$cenario.session);
    $.steps[node.id] = result;
  }
  Logic.runLogic(result, node, 'after', options);
  result.status = 'completed';

  return node;
}