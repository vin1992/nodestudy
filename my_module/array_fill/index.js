"use strict";
module.exports = function(item, n) {
  let ret = new Array(n);

  let isFn = typeof item === "function";

  if (!isFn && typeof ret.fill === "function") {
    return ret.fill(item);
  }

  for (let i = 0; i < n; i++) {
    ret[i] = isFn ? item(i, n, ret) : item;
  }

  return ret;
};
