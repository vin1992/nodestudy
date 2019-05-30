"use strict";

module.exports = function diff(arr) {
  var len = arguments.length;
  var idx = 0;

  while (++idx < len) {
    arr = diffArray(arr, arguments[idx]);
  }

  return arr;
};

function diffArray(one, two) {
  if (!Array.isArray(two)) {
    return one.slice();
  }

  var olen = one.length;
  var tlen = two.length;

  var res = [];

  var idx = -1;

  while (++idx < olen) {
    var el = one[idx];
    var hasEle = false;

    for (var i = 0; i < tlen; i++) {
      var val = two[i];
      if (val === el) {
        hasEle = true;
        break;
      }
    }

    if (hasEle === false) {
      res.push(el);
    }
  }

  return res;
}
