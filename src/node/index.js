import isFunction from 'lodash/isFunction';
import clone from 'lodash/clone';

import * as Logic from '../logic/index';

export const runNode = (node, options) => {
  if (!node) {
    return {};
  }

  const result = {
    status: 'running',
    name: node.name,
    type: node.type,
    failCount: 0,
    passCount: 0,
  };
  $.steps[node.id] = result;

  // TODO: Update how we do invoke, pass it in options so we don't have to copy it.
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
  Logic.runLogic(result, node, 'after', options);

  result.ctx = clone($.ctx);
  result.env = clone($.env);

  result.status = 'completed';
  result.time = Date.now() - start;

  // Update scenario result pass/fail count.
  $.passCount += result.passCount;
  $.failCount += result.failCount;

  return node;
}