const inArray = require("./in_array");

console.log(
  "是否在数组内部",
  inArray([{ a: 1 }, { b: 2 }, { c: 3 }], { b: 3 })
);
