var express = require("express");
var router = express.Router();
var Entry = require("../models/entry");

router.get("/post", (req, res, next) => {
  res.render("post", { title: "Post" });
});

router.post("/post", (req, res, next) => {
  const data = req.body.entry;
  const user = res.locals.user;
  const username = user ? user.name : null;

  const entry = new Entry({
    username,
    title: data.title,
    body: data.body
  });

  entry.save(err => {
    if (err) return next(err);
    res.redirect("/entries/list");
  });
});

router.get("/list", (req, res, next) => {
  Entry.getRange(0, 5, (err, entries) => {
    if (err) return next(err);
    res.render("entries", {
      title: "Entries",
      entries: entries
    });
  });
});

module.exports = router;
