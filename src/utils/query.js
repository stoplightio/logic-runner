import qs from 'qs';
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';

export const setQuery = (url, queryObj, options) => {
  options = options || {};

  if (isEmpty(queryObj)) {
    return url;
  }

  const urlParts = url.split('?');
  const query = urlParts[1];
  const existingQueryObj = qs.parse(query);

  if (options.preserve) {
    merge(queryObj, existingQueryObj);
  }

  merge(existingQueryObj, queryObj);

  return `${urlParts[0]}?${qs.stringify(existingQueryObj)}`;
};
