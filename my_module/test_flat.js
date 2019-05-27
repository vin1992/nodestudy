let flat = require("./array_flattern");
const arr = [1, 2, 3, [4, 5], [[6, 7, 8]]];
console.log("arr 处理之后", flat(arr));
