// this function creates a fallback for IE browser which does not support URL function

export const createURL = (u) => {
  let newURL = {};

  if (typeof document !== typeof undefined) {
    // browser

    if (typeof URL === 'function') {
      // modern
      newURL = new URL(u);
    } else {
      // old
      newURL = document.createElement('a');
      newURL.href = u;
    }
  } else {
    // node
    const url = require('url');
    newURL = url.parse(u);
  }

  return newURL;
};
