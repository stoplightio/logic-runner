import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
import trim from 'lodash/trim';
import get from 'lodash/get';
import uniq from 'lodash/uniq';

import {safeParse, safeStringify} from '../utils/json';

export const replaceVariables = (target, variables) => {
  if (isEmpty(target) || isEmpty(variables)) {
    return target || {};
  }

  let toProcess = safeStringify(target);

  const matches = uniq(toProcess.match(/<<([\[\]\.\w- ]+)>>|<<([\[\]\.\w- ]+)>>|%3C%3C([[\[\]\.\w- ]+)%3E%3E|\\<\\<([[\[\]\.\w- ]+)\\>\\>/gm));
  forEach(matches, (match) => {
    const variable = trim(match, '<>%3C%3E\\<\\>');

    const value = get(variables, variable);
    if (typeof value === 'string') {
      toProcess = toProcess.replace(match, value);
    } else {
      toProcess = toProcess.replace(new RegExp(`"${match}"|${match}`, 'g'), value);
    }
  });

  return safeParse(toProcess);
};
