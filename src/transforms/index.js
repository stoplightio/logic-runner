import get from 'lodash/get';
import set from 'lodash/set';
import forEach from 'lodash/forEach';

import {buildPathSelector} from '../utils/strings';

const SOURCE_REGEX = new RegExp(/^root|state|status|result|input/);
const ROOT_REGEX = new RegExp(/^root\./);

export const runTransform = (rootNode, resultNode, transform, options = {}) => {
  try {
    let sourceLocation = transform.sourceLocation;
    const useRootSource = sourceLocation.match(ROOT_REGEX);
    if (useRootSource) {
      sourceLocation = sourceLocation.replace(ROOT_REGEX, '');
    }
    const sourcePath = buildPathSelector([sourceLocation, transform.sourcePath]);
    if (!sourcePath.match(SOURCE_REGEX)) {
      return;
    }

    let targetLocation = transform.targetLocation;
    const useRootTarget = targetLocation.match(ROOT_REGEX);
    if (useRootTarget) {
      targetLocation = targetLocation.replace(ROOT_REGEX, '');
    }
    const targetPath = buildPathSelector([targetLocation, transform.targetPath]);
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
