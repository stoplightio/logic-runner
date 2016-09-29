import get from 'lodash/get';
import forEach from 'lodash/forEach';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import isNumber from 'lodash/isNumber';
import isUndefined from 'lodash/isUndefined';
import gt from 'lodash/gt';
import gte from 'lodash/gte';
import lt from 'lodash/lt';
import lte from 'lodash/lte';

import {buildPathSelector} from '../utils/strings';
import {safeParse, safeStringify} from '../utils/json';

const ASSERTION_OPS = [
  'eq',
  'ne',
  'exists',
  'contains',
  'gt',
  'gte',
  'lt',
  'lte',
  'validate.pass',
  'validate.fail',
];

export const runAssertion = (resultNode, assertion, options = {}) => {
  const result = {
    pass: false,
    message: '',
    details: '',
  };

  try {
    const {
      validate,
    } = options;

    const targetPath = buildPathSelector([assertion.location, assertion.target]);
    const value = get(resultNode, targetPath);

    try {
      switch (assertion.op) {
        case 'eq':
          if (!isEqual(value, assertion.expected)) {
            throw new Error(`Expected ${targetPath} to equal ${assertion.expected} - actual is '${value}'`);
          }
          break;
        case 'ne':
          if (isEqual(value, assertion.expected)) {
            throw new Error(`Expected ${targetPath} to NOT equal ${assertion.expected} - actual is '${value}'`);
          }
          break;
        case 'exists':
          if (isUndefined(value)) {
            throw new Error(`Expected ${targetPath} to exist - actual is '${value}'`);
          }
          break;
        case 'contains':
          if (!includes(value, assertion.expected)) {
            throw new Error(`Expected ${targetPath} to contain ${assertion.expected} - actual is '${value}'`);
          }
          break;
        case 'gt':
          if (!gt(value, assertion.expected)) {
            throw new Error(`Expected ${targetPath} to be greater than ${assertion.expected} - actual is '${value}'`);
          }
          break;
        case 'gte':
          if (!gte(value, assertion.expected)) {
            throw new Error(`Expected ${targetPath} to be greater than or equal to ${assertion.expected} - actual is '${value}'`);
          }
          break;
        case 'lt':
          if (!lt(value, assertion.expected)) {
            throw new Error(`Expected ${targetPath} to be less than ${assertion.expected} - actual is '${value}'`);
          }
          break;
        case 'lte':
          if (!lte(value, assertion.expected)) {
            throw new Error(`Expected ${targetPath} to be less than or equal to ${assertion.expected} - actual is '${value}'`);
          }
          break;
        case 'gt':
        case 'gte':
        case 'lt':
        case 'lte':
          if (!isNumber(value)) {
            throw new Error(`Expected ${targetPath} to be a number - actual is ${typeof value}`);
          }
          break;
        case 'validate.pass':
        case 'validate.fail':
          if (!validate) {
            throw new Error(`Cannot run ${assertion.op} assertion - no validate function provided in options`);
          }

          const validationResult = validate(value, safeParse(assertion.expected));

          if (!validationResult) {
            throw new Error('Unknown validation error');
          }

          if (!isEmpty(validationResult.details)) {
            result.details = safeStringify(validationResult.details);
          }

          if (validationResult.error && assertion.op === 'validate.pass') {
            throw new Error(validationResult.error);
          }

          if (!validationResult.error && assertion.op === 'validate.fail') {
            throw new Error('Expected validate to fail - actual passed');
          }

          break;
        default:
          result.details = `valid types are ${ASSERTION_OPS.join(',')}`;
          throw new Error(`'${assertion.op}' is not a valid operation type`);
      }

      result.pass = true;
    } catch (e) {
      result.pass = false;
      result.message = e.message;
    }

    return result;
  } catch(err) {
    result.pass = false;
    result.message = e.message;

    return result;
  }
};

export const runAssertions = (resultNode, assertions, options = {}) => {
  assertions = assertions || [];

  forEach(assertions, (a) => {
    a.result = runAssertion(resultNode, a, options);
  });

  return assertions;
};
