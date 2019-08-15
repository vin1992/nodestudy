const fs = require("fs");
const http = require("http");

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
  let output = `
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
      <style >
      .title {
        font-weight: bold;
      }
      .date {
        font-style: italic;
      }
      .body {
        font-family: 'Courier New', Courier, monospace
      }
    </style>
    </head>
    <body >
  `;

  list.map(item => {
    output += `<div class="title">${item.title}</div>`;
    output += `<div class="date">${item.date}</div>`;
    output += `<div class="body">${item.content}</div>`;
  });

  output += `
      </body>
    </html>
  `;
  return output;
}

const server = http.createServer((req, res) => {
  const output = render(getEntries());
  res.writeHead("200", { "content-type": "text/html" });
  res.end(output);
});

server.listen(8000);

console.log("server start successfully");
