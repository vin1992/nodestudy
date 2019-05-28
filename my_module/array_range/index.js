"use strict";

module.exports = (start, end) => {
  let n0 = typeof start === "number";
  let n1 = typeof end === "number";

  if (n0 && !n1) {
    end = start;
    start = 0;
  } else if (!n0 && !n1) {
    start = 0;
    end = 0;
  }

  start = +start;
  end = +end;
  let len = end - start;

  if (len < 0) {
    throw new Error("start索引要小于等于end索引");
  } else {
    let arr = new Array(len);

    for (let i = 0, c = start; i < len; i++, c++) {
      arr[i] = c;
    }

    return arr;
  }
};
