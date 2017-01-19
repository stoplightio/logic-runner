import isFunction from 'lodash/isFunction';

import * as Logic from '../logic/index';
import * as JSONHelpers from '../utils/json';

export const runNode = (node, options) => {
  if (!node) {
    return {};
  }
  // TODO: handle setting state and ctx on step results so we can see the changes.
  // TODO: Figure out Scenario Results
  const result = {
    status: 'running',
    name: node.name,
    type: node.type,
    failCount: 0,
    passCount: 0,
  };

  $.steps[node.id] = result;

  let invoke;
  if (node.input && isFunction(node.input.invoke)) {
    invoke = node.input.invoke;
  }

  const start = Date.now();
  node = Logic.runLogic(result, node, 'before', options);

  if (invoke) {
    node.input.invoke = invoke;
  }
  result.input = node.input;

  if (invoke) {
    result.output = node.input.invoke(_$cenario.session, result.input);
  }
  Logic.runLogic(result, node, 'after', options)

  result.status = 'completed';
  result.time = Date.now() - start;
  // Update scenario result pass/fail count.
  $.passCount += result.passCount;
  $.failCount += result.failCount;

  return node;
}