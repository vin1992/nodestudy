const events = require("events");
const net = require("net");

const channel = new events.EventEmitter();

channel.clients = {};
channel.subscriptions = {};
channel.setMaxListeners(50);

channel.on("join", function(id, client) {
  this.clients[id] = client;
  this.subscriptions[id] = (senderId, message) => {
    if (id != senderId) {
      this.clients[id].write(message);
    }
  };
  this.on("broadcast", this.subscriptions[id]);

  const welcome = `欢迎光临! 当前在线人数:${
    this.listeners("broadcast").length
  }`;

  client.write(`${welcome}\n`);
});

channel.on("hura", function(id, data) {
  channel.emit("broadcast", id, "来，欢迎品如！");
});

channel.on("leave", function(id) {
  channel.removeListener("broadcast", this.subscriptions[id]);
  channel.emit("broadcast", id, `${id} has left the classroom. \n`);
});

channel.on("shutdown", () => {
  channel.emit("broadcast", "", "the server has shut down. \n");
  channel.removeAllListeners("broadcast");
});

const server = net.createServer(client => {
  const id = `${client.remoteAddress}:${client.remotePort}`;
  channel.emit("join", id, client);

  client.on("data", data => {
    data = data.toString();
    console.log(
      "当前客户端",
      channel.clients,
      "当前客户端监听器",
      channel.subscriptions
    );
    if (data === "shutdown\r\n") {
      channel.emit("shutdown");
    } else if (data === "winter\r\n") {
      channel.emit("hura", id, data);
    }

    channel.emit("broadcast", id, data);
  });

  client.on("close", () => {
    channel.emit("leave", id);
  });
});

server.listen(8888);
