import get from 'lodash/get';
import set from 'lodash/set';
import forEach from 'lodash/forEach';

import {buildPathSelector} from '../utils/strings';
import {safeParse, safeStringify} from '../utils/json';

const SOURCE_WHITELIST = [
  'output',
  'state',
  'error',
];

const SOURCE_REGEX = new RegExp(/^output|state|error/);

export const runTransform = (resultNode, transform, options = {}) => {
  try {
    const sourcePath = buildPathSelector([transform.sourceLocation, transform.sourcePath]);

    if (!sourcePath.match(SOURCE_REGEX)) {
      return;
    }

    const targetPath = buildPathSelector([transform.targetLocation, transform.targetPath]);
    const value = get(resultNode, sourcePath);
    set(resultNode, targetPath, value);
  } catch (e) {
    console.warn('transforms#runTransform', e, resultNode, transform);
  }
};

export const runTransforms = (resultNode, transforms, options = {}) => {
  transforms = transforms || [];

  forEach(transforms, (a) => {
    runTransform(resultNode, a, options);
  });
};
