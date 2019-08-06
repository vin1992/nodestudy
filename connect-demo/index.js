const app = require("connect")();
const errorHandler = require("./errorHandler");

// 可配置的中间件
const logger = format => {
  const reg = /:(\w+)/g;
  return (req, res, next) => {
    const str = format.replace(reg, (match, property) => {
      console.log(match, property);
      return req[property];
    });
    console.log(str);
    next();
  };
};

const hello = (req, res, next) => {
  foo();

  res.setHeader("content-type", "text/plain");
  res.end("Hello world!");
  next();
};

const echoShit = (req, res, next) => {
  console.log("shit", next);
};

app.use(logger(":method :url :aaa"));
app.use(hello);
app.use(echoShit);
app.use(errorHandler);
app.listen(3000);
