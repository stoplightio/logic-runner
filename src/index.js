import get from 'lodash/get';
import set from 'lodash/set';
import * as Assertions from './assertions/index';

/**
 * Runs a logic block on a given node. For example, the before, after, assertions, and transforms for a function.
 * @param {string} node - The flow node we are operating on, for example a single "step" or "function" object.
 * @param {string} logicPath - The path selector (ie [0].before) to the logic object we are running.
 * @param {Object} options
 * @param {function(object, object)} options.validate - The validation function, takes the value as the first argument, and the schema as the second.
 */
const runLogic = (node, logicPath, options) => {
  if (!node) {
    return {};
  }

  let logic = get(node, logicPath);
  if (!logic) {
    return node;
  }

  // TODO: replace variables

  // TODO: run transforms

  // run assertions
  const assertions = Assertions.runAssertions(node, logic.assertions, options);
  set(node, logicPath + '.assertions', assertions);

  // TODO: run script

  return node;
};

export default runLogic;
