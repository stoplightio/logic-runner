import map from 'lodash/map';
import isArray from 'lodash/isArray';
import stringify from 'json-stringify-safe';

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
    return stringify(target, null, offset || 4);
  }

  return target;
};


export const mapToNameValue = (obj) => {
  if (obj instanceof Array) {
    return obj;
  }

  return map(obj || {}, (value, name) => ({name, value}));
};

export const nameValueToMap = (nameValueArray) => {
  if (!isArray(nameValueArray)) {
    return nameValueArray;
  }

  const result = {};
  for (const {name, value} of nameValueArray) {
    result[name] = value;
  }

  return result;
};
