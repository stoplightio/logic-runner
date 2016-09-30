import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';

export const buildPathSelector = (parts) => {
  parts = parts || [];
  let targetPath = '';

  forEach(parts, (part) => {
    if (!isEmpty(part)) {
      if (isEmpty(targetPath) || part.charAt(0) === '[') {
        targetPath += part;
      } else {
        targetPath += `.${part}`;
      }
    }
  });

  return targetPath;
};
