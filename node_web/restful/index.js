const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const read = require("node-readability");

const { Article } = require("./db");

app.set("port", process.env.PORT || 3000);

// post 消息体解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 获取文章列表
app.get("/articles", (req, res, next) => {
  Article.all((err, articles) => {
    if (err) return next(err);
    res.send(articles);
  });
});

// 创建一篇文章
app.post("/articles", (req, res, next) => {
  const url = req.body.url;

  read(url, (err, result) => {
    if (err || !result) res.status(500).send("Error downloading article");

    Article.create(
      { title: result.title, content: result.content },
      (err, article) => {
        if (err) return next(err);
        res.send(article);
      }
    );
  });
});

// 获取指定文章
app.get("/articles/:id", (req, res, next) => {
  const id = req.params.id;
  console.log("Fetching:", id);
  Article.find(id, (err, article) => {
    if (err) return next(err);
    res.send(article);
  });
});

// 删除指定文章
app.delete("/articles/:id", (req, res, next) => {
  const id = req.params.id;
  console.log("Deleting:", id);
  Article.delete(id, err => {
    if (err) return next(err);
    res.send({ message: "Deleted" });
  });
});

app.listen(app.get("port"), () => {
  console.log("App started on port", app.get("port"));
});

module.exports = app;
