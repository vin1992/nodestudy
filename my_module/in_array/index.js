"use strict";

module.exports = (arr, item) => {
  arr = arr || [];
  let len = arr.length;

  for (let i = 0; i < len; i++) {
    let el = arr[i];
    if (JSON.stringify(el) === JSON.stringify(item)) {
      return true;
    }
  }

  return false;
};
