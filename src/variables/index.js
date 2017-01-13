import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
import trim from 'lodash/trim';
import trimStart from 'lodash/trimStart';
import get from 'lodash/get';
import uniq from 'lodash/uniq';
import omit from 'lodash/omit';
import escapeRegExp from 'lodash/escapeRegExp';

import {safeParse, safeStringify} from '../utils/json';

export const extractVariables = (target) => {
  const toProcess = safeStringify(target);
  const matches = [];
  const reg = new RegExp(/\{(\$.[\[\]\.\w- ']+)\}|(\$.[\[\]\.\w- ']+)"/g)
  while (true) {
    var match = reg.exec(toProcess);
    if (!match || isEmpty(match)) {
      console.log(safeStringify(matches));
      return matches;
    }

    matches.push(match[0]);
  }
};

export const replaceVariables = (target, variables) => {
  const parsedVariables = safeParse(variables);
  console.log("variables", safeStringify(variables));
  if (isEmpty(target) || isEmpty(parsedVariables)) {
    return target;
  }

  let toProcess = safeStringify(target);
  const matches = extractVariables(target);
  forEach(matches, (match) => {
    const variable = trimStart(trim(match, '{} '), '$.');

    console.log('variable', variable);
    const value = get(parsedVariables, variable);
    console.log("value is", value);
    if (typeof value !== 'undefined') {
      if (typeof value === 'string') {
        toProcess = toProcess.replace(new RegExp(escapeRegExp(match), 'g'), value);
      } else {
        toProcess = toProcess.replace(new RegExp(`"${match}"|${match}`, 'g'), value);
      }
    }
  });

  return safeParse(toProcess, toProcess || target);
};

export const replaceNodeVariables = (node) => {
  try {
    return replaceVariables(node, $);
  } catch(e) {
    console.log('error parsing variables:', e);
    return node;
  }
};
