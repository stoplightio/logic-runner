import get from 'lodash/get';
import set from 'lodash/set';
import forEach from 'lodash/forEach';
import trimStart from 'lodash/trimStart';

export const runTransform = (rootNode, resultNode, transform, options = {}) => {
  try {
    const sourcePath = transform.source;
    const targetPath = transform.target;

    const sourceNode = sourcePath.charAt(0) === '$' ? rootNode : resultNode;
    const targetNode = sourcePath.charAt(0) === '$' ? rootNode : resultNode;

    const value = get(sourceNode, trimStart(sourcePath, '$.'));

    set(targetNode, trimStart(targetPath, '$.'), value);
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
