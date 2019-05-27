const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    if (req.url == "/") {
      fs.readFile("./data.json", (err, data) => {
        if (err) {
          console.error(err);
          res.end("Server Error");
        } else {
          const contents = JSON.parse(data.toString());
          fs.readFile("./tpl.html", (err, data) => {
            if (err) {
              console.error(err);
              res.end("Server Error");
            } else {
              const tpl = data.toString();
              const html = tpl.replace("%", contents.join("</li><li>"));

              res.writeHead(200, { "Content-Type": "text/html" });
              res.end(html);
            }
          });
        }
      });
    }
  })
  .listen(1234, "127.0.0.1");
