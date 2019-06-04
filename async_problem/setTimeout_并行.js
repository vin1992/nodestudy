const async = require("async");

const asyncFn = (c, t, cb) => {
  setTimeout(() => {
    console.log(`第${c}个执行`);
    cb && cb();
  }, t);
};

async.series([
  cb => {
    asyncFn(1, 1000, cb);
  },
  cb => {
    asyncFn(2, 500, cb);
  },
  cb => {
    asyncFn(3, 100, cb);
  }
]);
