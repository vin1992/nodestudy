const fs = require("fs");
const http = require("http");
const ejs = require("ejs");

function getEntries() {
  let str = fs.readFileSync("./entries.txt", "utf8");
  let entriesList = [];
  let strList = str.split("---");
  strList.map(lines => {
    let line = lines.split("\n");
    let entries = {};
    line.map(c => {
      if (c.indexOf("title: ") == 0) {
        entries.title = c.replace("title: ", "");
      } else if (c.indexOf("date: ") == 0) {
        entries.date = c.replace("date: ", "");
      } else {
        entries.content = entries.content || "";
        entries.content += c;
      }
    });
    entriesList.push(entries);
  });

  console.log(entriesList);
  return entriesList;
}

function render(list) {
  const template = fs.readFileSync("./templates/page.ejs", "utf8");
  const values = { list: list };
  return ejs.render(template, values);
}

const server = http.createServer((req, res) => {
  const output = render(getEntries());
  res.writeHead("200", { "content-type": "text/html" });
  res.end(output);
});

server.listen(8000);

console.log("server start successfully");
