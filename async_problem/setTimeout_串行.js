setTimeout(() => {
  console.log("第一个执行");
  setTimeout(() => {
    console.log("第二个执行");
    setTimeout(() => {
      console.log("第三个执行");
    }, 100);
  }, 500);
}, 1000);
