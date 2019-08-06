const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", (req, res, next) => {
  res.render("login", { title: "登录页面" });
});

router.post("/", (req, res, next) => {
  let { name, pass } = req.body.user;

  User.authenticate(name, pass, (err, user) => {
    if (err) return next(err);

    if (user) {
      console.log("登录成功");
      req.session.uid = user.id;
      res.redirect("/entries/list");
    } else {
      console.log("登录失败");
      res.error("对不起，登录校验失败");
      res.redirect("back");
    }
  });
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(err => {
    if (err) throw err;
    res.redirect("/");
  });
});
module.exports = router;
