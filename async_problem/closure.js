function asyncFunc(cb) {
  setTimeout(() => {
    typeof cb === "function" && cb();
  }, 200);
}

let color = "blue";

(color => {
  asyncFunc(() => {
    console.log(`the color is ${color}`);
  });
})(color);

color = "pink";
