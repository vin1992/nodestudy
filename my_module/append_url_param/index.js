"use strict";

const getQueryObj = search => {
  let ret = {};

  let tmp = search.split("&");
  tmp.forEach(item => {
    let k = item.split("=")[0];
    let v = item.split("=")[1];
    ret[k] = v;
  });

  return ret;
};

const joinQueryStr = (o, encode) => {
  let str = "";
  let keys = Object.keys(o);
  for (let k in o) {
    let qs = `${k}=${o[k]}${keys.indexOf(k) !== keys.length - 1 ? "&" : ""}`;

    str += encode ? encodeURIComponent(qs) : qs;
  }

  return str;
};

const isObject = q => {
  return (
    typeof q === "object" &&
    q !== null &&
    !(q instanceof RegExp) &&
    !(q instanceof Date) &&
    !(q instanceof Error)
  );
};

module.exports = (url, q, encode = true) => {
  if (!isObject(q)) {
    throw new Error(`参数格式必须是对象key=value值形式`);
  }
  let idx = url.indexOf("?");
  let hasAsking = idx !== -1;

  let search = hasAsking ? url.slice(idx + 1) : "";
  let ret = hasAsking ? url.slice(0, idx + 1) : url;
  let newParams = {};

  if (search) {
    // 合并
    newParams = Object.assign(getQueryObj(search), q);
  } else {
    // 追加
    newParams = q;
  }

  let str = hasAsking
    ? joinQueryStr(newParams, encode)
    : "?" + joinQueryStr(newParams, encode);

  return ret + str;
};
