let express = require("express");
let router = express.Router();

router.get("/", (req, res, next) => {
  res.render("back", { title: "啊哦！", msg: "出错啦" });
});

module.exports = router;
