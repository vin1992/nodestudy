const dedupe = require("./dedupe");

let arr = [1, 2, 3, 4, 5, 6, 6, 7, 9];

console.log("数组去虫：", dedupe(arr));
