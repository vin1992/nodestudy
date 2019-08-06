const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", (req, res, next) => {
  res.render("register", { title: "注册页面" });
});

router.post("/", (req, res, next) => {
  let { name, pass } = req.body.user;

  User.getByName(name, (err, user) => {
    if (err) return next(err);
    if (user.id) {
      res.error("用户名已存在");
      res.redirect("back");
    } else {
      let user = new User({ name, pass });

      user.save(err => {
        if (err) return next(err);
        res.session.uid = user.id;
        res.redirect("/");
      });
    }
  });
});

module.exports = router;
