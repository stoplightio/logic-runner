import get from 'lodash/get';
import set from 'lodash/set';
import merge from 'lodash/merge';
import isEmpty from 'lodash/isEmpty';

import * as Variables from '../variables/index';
import * as Assertions from '../assertions/index';
import * as Transforms from '../transforms/index';
import * as Authorization from '../authorization/index';

const patchAuthorization = (node, options) => {
  // Run Authorization & Patch
  const authPatch = Authorization.generateAuthPatch(get(node, 'input.authorization'), get(node, 'input.request'), options);
  if (!isEmpty(authPatch)) {
    const input = get(node, 'input') || {};
    merge(input, authPatch);
    set(node, 'input', input);
  }
};

const runScript = (func, state, vars) => {
  eval(`with (vars) {${func}}`);
};

/**
 * Runs a logic block on a given node. For example, the before, after, assertions, and transforms for a function.
 * @param {string} node - The flow node we are operating on, for example a single "step" or "function" object.
 * @param {string} logicPath - The path selector (ie [0].before) to the logic object we are running.
 * @param {Object} options
 * @param {function(object, object)} options.validate - An optional validation function, takes the value as the first argument, and the schema as the second.
 */
export const runLogic = (node, logicPath, options) => {
  if (!node) {
    return {};
  }

  // Replace variables before script
  node = Variables.replaceNodeVariables(node);

  const logic = get(node, logicPath);
  if (!logic) {
    // Patch Authorization
    patchAuthorization(node, options);
    return node;
  }

  // Run Transforms
  Transforms.runTransforms(node, logic.transforms, options);

  // Run Script
  const script = logic.script;
  if (!isEmpty(script)) {
    if (logicPath === 'before') {
      const input = get(node, 'input') || {};
      const state = get(node, 'state') || {};
      runScript(script, state, input);
      set(node, 'state', state);
    } else {
      const output = get(node, 'result.output') || {};
      const state = get(node, 'result.state') || {};
      runScript(script, state, output);
      set(node, 'result.state', state);
    }
  }

  // Patch Authorization
  patchAuthorization(node, options);

  // Replace variables after script
  node = Variables.replaceNodeVariables(node);

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
