import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
import trim from 'lodash/trim';
import trimStart from 'lodash/trimStart';
import get from 'lodash/get';
import uniq from 'lodash/uniq';
import omit from 'lodash/omit';
import escapeRegExp from 'lodash/escapeRegExp';
import clone from 'lodash/clone';
import replace from 'lodash/replace';

import { safeParse, safeStringify } from '../utils/json';

export const extractVariables = (target) => {
  const toProcess = safeStringify(target);
  const matches = [];
  const reg = new RegExp(/\{(\$\.[\[\]\.\w- ']+)\}|(\$\.[\[\]\.\w- ']+)"/g)
  while (true) {
    const match = reg.exec(toProcess);
    if (!match || isEmpty(match)) {
      return matches;
    }

    matches.push(match[2] || match[0]);
  }
};

export const replaceVariables = (target, variables = {}) => {
  const parsedVariables = safeParse(variables);
  if (isEmpty(target) || isEmpty(parsedVariables)) {
    return target;
  }

  let toProcess = safeStringify(target);
  const matches = extractVariables(target);
  forEach(matches, (match) => {
    const variable = trimStart(trim(match, '{} '), '$.');
    const value = get(parsedVariables, variable);
    if (typeof value !== 'undefined') {
      if (typeof value === 'string') {
        toProcess = toProcess.replace(new RegExp(escapeRegExp(match), 'g'), value);
      } else {
        match = replace(match, '$.', '\\$\\.');
        toProcess = toProcess.replace(new RegExp(`"${match}"|${match}`, 'g'), value);
      }
    }
  });

  return safeParse(toProcess, toProcess || target);
};

export const replaceNodeVariables = (node) => {
  const before = clone(node.before);
  const after = clone(node.after);

  node = replaceVariables(node, $);

  if (before) {
    if (typeof before.assertions != 'undefined') {
      forEach(before.assertions, (a, i) => {
        node.before[i].target = a.target;
      });
    }
    node.before.script = before.script;
    node.before.transforms = before.transforms;
  }

  if (after) {
    if (typeof after.assertions != 'undefined') {
      forEach(after.assertions, (a, i) => {
        node.after[i].target = a.target;
     });
    }
    node.after.script = after.script;
    node.after.transforms = after.transforms;
  }

  return node;
};
