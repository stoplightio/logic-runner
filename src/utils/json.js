export const safeParse = (target, defaultValue) => {
  if (typeof target === 'string') {
    try {
      return JSON.parse(target);
    } catch (e) {
      return defaultValue || {};
    }
  }

  return target;
};

export const safeStringify = (target, offset) => {
  if (target && typeof target !== 'string') {
    return JSON.stringify(target, null, offset || 4);
  }

  return target;
};
