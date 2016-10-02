import get from 'lodash/get';
import set from 'lodash/set';
import omit from 'lodash/omit';
import merge from 'lodash/merge';
import isEmpty from 'lodash/isEmpty';

import * as Variables from '../variables/index';
import * as Assertions from '../assertions/index';
import * as Transforms from '../transforms/index';
import * as Authorization from '../authorization/index';

/**
 * Runs a logic block on a given node. For example, the before, after, assertions, and transforms for a function.
 * @param {string} node - The flow node we are operating on, for example a single "step" or "function" object.
 * @param {string} logicPath - The path selector (ie [0].before) to the logic object we are running.
 * @param {Object} options
 * @param {function(object, object)} options.validate - The validation function, takes the value as the first argument, and the schema as the second.
 */
export const runLogic = (node, logicPath, options) => {
  if (!node) {
    return {};
  }

  // Replace Variables
  const steps = node.steps;
  const children = node.children;
  const functions = node.functions;
  node = Variables.replaceVariables(omit(node, 'steps', 'children', 'functions'), node.state);
  if (steps) {
    node.steps = steps;
  }
  if (children) {
    node.children = children;
  }
  if (functions) {
    node.functions = functions;
  }

  // Run Authorization & Patch
  const authPatch = Authorization.generateAuth(get(node, 'input.authorization'));
  if (!isEmpty(authPatch)) {
    const request = get(node, 'input.request') || {};
    merge(request, authPatch);
    set(node, 'input.request', request);
  }

  const logic = get(node, logicPath);
  if (!logic) {
    return node;
  }

  // Run Transforms
  Transforms.runTransforms(node, logic.transforms, options);

  // TODO: Run Script

  // Run Assertions
  const assertions = Assertions.runAssertions(node, logic.assertions, options);
  set(node, `${logicPath}.assertions`, assertions);

  return node;
};

// export const runNode = (node, options) => {
//   node = runLogic(node, 'before', options);
//   options.invoke(node);
//   node = runLogic(node, 'after', options);

//   return node;
// }
