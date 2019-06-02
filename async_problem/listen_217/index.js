const fs = require("fs");
const request = require("request");
const htmlparser = require("htmlparser");
const configFilename = "./rss_feeds.txt";

function checkForRSSFile() {
  fs.exists(configFilename, exists => {
    if (!exists) return next(new Error(`没有 RSS 文件: ${configFilename}`));
    next(null, configFilename);
  });
}

function readRSSFile(configFilename) {
  fs.readFile(configFilename, (err, feedList) => {
    if (err) return next(err);
    feedList = feedList
      .toString()
      .replace(/^\s+|\s+$/g, "")
      .split("\n");
    const random = Math.floor(Math.random() * feedList.length);
    console.log(feedList[random], random);
    next(null, feedList[random]);
  });
}

function downloadRSSFeed(feedUrl) {
  request({ uri: feedUrl }, (err, res, body) => {
    if (err) return next(err);
    if (res.statusCode !== 200) {
      return next(new Error("response fail"));
    }

    next(null, body);
  });
}

function parseRSSFeed(rss) {
  const handler = new htmlparser.RssHandler();
  const psr = new htmlparser.Parser(handler);

  psr.parseComplete(rss);

  console.log(handler.dom);
  if (!handler.dom.items.length) {
    return next(new Error("没有RSS"));
  }

  const item = handler.dom.items.shift();
  console.log(item.title);
  console.log(item.link);
}

const tasks = [checkForRSSFile, readRSSFile, downloadRSSFeed, parseRSSFeed];

function next(err, res) {
  if (err) throw err;
  const currentTask = tasks.shift();
  currentTask && currentTask(res);
}

next();
