import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
import trim from 'lodash/trim';
import get from 'lodash/get';
import uniq from 'lodash/uniq';
import omit from 'lodash/omit';

import {safeParse, safeStringify} from '../utils/json';

export const extractVariables = (target, {strip = false, required = false} = {}) => {
  const toProcess = safeStringify(target);
  let matches;
  if (required) {
    matches = uniq(toProcess.match(/<<!([\[\]\.\w- ]+)>>/gm)) || [];
  } else {
    matches = uniq(toProcess.match(/<<!([\[\]\.\w- ]+)>>|<<([\[\]\.\w- ]+)>>|\{([\[\]\.\w- ]+)\}|%3C%3C([[\[\]\.\w- ]+)%3E%3E|\\<\\<([[\[\]\.\w- ]+)\\>\\>/gm)) || [];
  }

  if (strip) {
    for (const i in matches) {
      matches[i] = trim(matches[i], '<!>{}%3C%3E\\<\\>');
    }
  }

  return matches;
};

export const replaceVariables = (target, variables) => {
  const parsedVariables = safeParse(variables);

  if (isEmpty(target) || isEmpty(parsedVariables)) {
    return target;
  }

  let toProcess = safeStringify(target);
  const matches = extractVariables(target);
  forEach(matches, (match) => {
    const variable = trim(match, '<!>{}%3C%3E\\<\\>');

    const value = get(parsedVariables, variable);
    if (typeof value !== 'undefined') {
      if (typeof value === 'string') {
        toProcess = toProcess.replace(match, value);
      } else {
        toProcess = toProcess.replace(new RegExp(`"${match}"|${match}`, 'g'), value);
      }
    }
  });

  return safeParse(toProcess, toProcess || target);
};

export const replaceNodeVariables = (node) => {
  const steps = node.steps;
  const children = node.children;
  const functions = node.functions;

  const newNode = replaceVariables(omit(node, 'steps', 'children', 'functions'), node.state);
  if (steps) {
    newNode.steps = steps;
  }
  if (children) {
    newNode.children = children;
  }
  if (functions) {
    newNode.functions = functions;
  }

  return newNode;
};
