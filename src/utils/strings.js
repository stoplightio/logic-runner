import isEmpty from 'lodash/isEmpty';

export const buildPathSelector = (parts) => {
  parts = parts || [];
  let targetPath = '';

  for (const part of parts) {
    if (!isEmpty(part)) {
      if (isEmpty(targetPath) || part.charAt(0) === '[') {
        targetPath += part;
      } else {
        targetPath += `.${part}`;
      }
    }
  }

  return targetPath;
};
