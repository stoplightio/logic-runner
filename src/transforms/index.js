import get from 'lodash/get';
import set from 'lodash/set';
import forEach from 'lodash/forEach';

import {buildPathSelector} from '../utils/strings';

const SOURCE_REGEX = new RegExp(/^state|status|result|input/);

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
