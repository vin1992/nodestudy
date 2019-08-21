const http = require("http");
const port = 1234;

const server = http.createServer((req, res) => {
  res.end("Hello, webpack");
});

server.listen(port, () => {
  console.log("Server listening on: http://localhost:%s", port);
});
