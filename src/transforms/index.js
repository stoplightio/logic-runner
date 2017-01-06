import get from 'lodash/get';
import set from 'lodash/set';
import forEach from 'lodash/forEach';

import {buildPathSelector} from '../utils/strings';

const SOURCE_REGEX = new RegExp(/^root|state|status|result|input|response/);
const ROOT_REGEX = new RegExp(/^root\./);

export const runTransform = (rootNode, resultNode, transform, options = {}) => {
  try {
    let source = transform.source;
    const useRootSource = source.match(ROOT_REGEX);
    if (useRootSource) {
      source = source.replace(ROOT_REGEX, '');
    }
    const sourcePath = buildPathSelector([source]);
    if (!sourcePath.match(SOURCE_REGEX)) {
      return;
    }

    let target = transform.target;
    const useRootTarget = target.match(ROOT_REGEX);
    if (useRootTarget) {
      target = target.replace(ROOT_REGEX, '');
    }
    const targetPath = buildPathSelector([target]);
    if (!targetPath.match(SOURCE_REGEX)) {
      return;
    }

    const sourceNode = useRootSource ? rootNode : resultNode;
    const targetNode = useRootTarget ? rootNode : resultNode;

    const value = get(sourceNode, sourcePath);

    set(targetNode, targetPath, value);
  } catch (e) {
    console.warn('transforms#runTransform', e, resultNode, transform);
  }
};

export const runTransforms = (rootNode, resultNode, transforms, options = {}) => {
  transforms = transforms || [];

  forEach(transforms, (a) => {
    runTransform(rootNode, resultNode, a, options);
  });
};
