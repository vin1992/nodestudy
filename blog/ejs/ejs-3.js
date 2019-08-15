const fs = require("fs");
const http = require("http");

const tpl = fs.readFileSync("./ejs-3.html", "utf8");
http
  .createServer((req, res) => {
    res.writeHead("200", { "Cotent-Type": "text/html" });
    res.end(tpl);
  })
  .listen(8000);
