import get from 'lodash/get';
import set from 'lodash/set';
import merge from 'lodash/merge';
import isEmpty from 'lodash/isEmpty';
import includes from 'lodash/includes';
import cloneDeep from 'lodash/clone';

import * as Variables from '../variables/index';
import * as Assertions from '../assertions/index';
import * as Transforms from '../transforms/index';
import * as Authorization from '../authorization/index';
import * as JSONHelpers from '../utils/json';
import _Base64 from '../utils/base64';

const patchAuthorization = (node, options) => {
  const authNode = get(node, 'input.authorization');

  // Run Authorization & Patch
  if (!isEmpty(authNode)) {
    const authPatch = Authorization.generateAuthPatch(authNode, get(node, 'input.request'), options);
    if (!isEmpty(authPatch)) {
      const input = get(node, 'input') || {};
      merge(input, authPatch);
      set(node, 'input', input);
    }
  }
};

export const runScript = (script, root, state = {}, tests = {}, input = {}, output = {}, logger) => {
  // additional functions available to scripts
  const Base64 = _Base64;
  const {safeStringify, safeParse} = JSONHelpers;
  const skip = () => {
    throw new Error('SKIP');
  };
  const stop = () => {
    throw new Error('STOP');
  };
  const reportError = (e) => {
    if (logger) {
      logger.log('error', 'script', ['script syntax error', String(e)]);
    } else {
      console.error('unknown script error', e);
    }
  };

  const result = {
    status: null,
  };

  try {
    eval(`
      if (logger) {
        console.debug = function() {
          logger.log('debug', 'script', _.values(arguments));
        }
        console.log = console.info = function() {
          logger.log('info', 'script', _.values(arguments));
        }
        console.warn = function() {
          logger.log('warn', 'script', _.values(arguments));
        }
        console.error = function() {
          logger.log('error', 'script', _.values(arguments));
        }
      }
      ${script}
    `);
  } catch (e) {
    if (e.message === 'SKIP') {
      result.status = 'skipped';
    } else if (e.message === 'STOP') {
      result.status = 'stopped';
    } else {
      // adjust the line number to remove code added that the user doesn't know about
      const match = e.message.match(/line [0-9]+/);
      if (match) {
        const parts = match[0].split(' ');
        const lineNum = Number(parts[1]);
        e.message = e.message.replace(`line ${lineNum}`, `line ${lineNum - 18}`);
      }

      reportError(e);
    }
  }

  return result;
};

/**
 * Runs a logic block on a given node. For example, the before, after, assertions, and transforms for a function.
 * @param {string} node - The flow node we are operating on, for example a single "step" or "function" object.
 * @param {string} logicPath - The path selector (ie [0].before) to the logic object we are running.
 * @param {Object} options
 * @param {function(object, object)} options.validate - An optional validation function, takes the value as the first argument, and the schema as the second.
 */
export const runLogic = (result, node, logicPath, options) => {
  if (!node) {
    return {};
  }

  // Replace variables before script
  // TOOD: Add back
  // node = Variables.replaceNodeVariables(node);
  const logic = get(node, logicPath);
  if (!logic) {
    console.log("No logic so return!")
    // Patch Authorization
    // patchAuthorization(node, options);
    return node;
  }

  // Init Logs
  const logs = get(result, 'logs') || [];
  // Init Options
  options = options || {};
  options.logger = {
    log(type, context, messages) {
      if (isEmpty(messages)) {
        console.warn('You cannot log with no messages.');
      }

      const cleanMessages = messages.map(m => JSONHelpers.safeStringify(m));
      print(cleanMessages);
      logs.push({
        type,
        source: [logicPath].concat(context || []).join('.'),
        msg: cleanMessages,
      });
    },
  };

  // Run Transforms
  // TODO: Add back
  // Transforms.runTransforms(rootResultNode, node, logic.transforms, options);

  // Run Script
  const tests = {};
  const script = logic.script;
  let scriptResult;
  if (!isEmpty(script)) {
    if (logicPath === 'before') {
      const input = get(node, 'input') || {};
      // const state = cloneDeep(get(node, 'state') || {});
      // const resultOutput = get(rootResultNode, 'output') || {};
      scriptResult = runScript(script, $.response, {}, tests, input, {}, options.logger);
      // set(node, 'state', state);
    } else {
      const input = get(result, 'input') || {};
      const output = get(result, 'output') || {};
      // const state = cloneDeep(get(node, 'result.state') || {});
      // const resultOutput = get(rootResultNode, 'output') || {};
      // scriptResult = runScript(script, $.response, {}, tests, input, output, options.logger);
      // set(node, 'result.state', state);
    }

    // if (includes(['skipped', 'stopped'], scriptResult.status)) {
    //   result.status = scriptResult.status;
    //   return node;
    // }
  }

  // Patch Authorization
  // patchAuthorization(node, options);

  // Replace variables after script
  // TOOD: Add back
  // node = Variables.replaceNodeVariables(node);

  // Run Assertions
  let n = node;
  if (logicPath === 'after') {
    n = result;
  }
  const assertions = Assertions.runAssertions(n, logic.assertions, options);

  // Add Test Assertions
  if (!isEmpty(tests)) {
    for (const key in tests) {
      const pass = tests[key];
      assertions.push({
        target: `${logicPath}.script`,
        op: 'tests',
        expected: '',
        result: {
          pass,
          message: key,
        },
      });
    }
  }

  // Set Assertions
  set(result, `${logicPath}.assertions`, assertions);

  // Set Logs
  set(result, 'logs', logs);

  return node;
};
