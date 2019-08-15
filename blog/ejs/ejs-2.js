const ejs = require("ejs");
const http = require("http");
const fs = require("fs");

const tpl = "./templates/view.ejs";

const students = [{ name: "张三", age: 12 }, { name: "lisi", age: 13 }];

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile(tpl, (err, data) => {
      if (err) throw Error(err);
      const template = data.toString();
      const output = ejs.render(template, { students });
      res.writeHead("200", { "Content-Type": "text/html" });
      res.end(output);
    });
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

server.listen(8000);
