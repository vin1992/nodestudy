const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    if (req.url == "/") {
      getFile(res);
    }
  })
  .listen(1234, "127.0.0.1");

function getFile(res) {
  fs.readFile("./data.json", (err, data) => {
    if (err) return handleError(err, res);

    let content = JSON.parse(data.toString());
    getTpl(content, res);
  });
}

function getTpl(c, res) {
  fs.readFile("./tpl.html", (err, data) => {
    if (err) handleError(err, res);

    formatHtml(data, c, res);
  });
}

function formatHtml(data, c, res) {
  const tpl = data.toString();
  const html = tpl.replace("%", c.join("</li><li>"));

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
}

function handleError(err, res) {
  console.error(err);
  res.end("Server Error");
}
