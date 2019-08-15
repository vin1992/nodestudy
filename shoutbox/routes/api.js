const auth = require("basic-auth");
const User = require("../models/user");
var Entry = require("../models/entry");

exports.auth = (req, res, next) => {
  const { name, pass } = auth(req);
  User.authenticate(name, pass, (err, user) => {
    // if (err) return next(err);
    if (user) req.remoteUser = user;
    next(err);
  });
};

// 根据id 获取用户数据
exports.user = (req, res, next) => {
  User.get(req.params.id, (err, user) => {
    if (err) return next(err);
    if (!user.id) return res.sendStatus(404);
    res.json(user);
  });
};

// 添加消息
exports.add = (req, res, next) => {
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
    if (req.remoteUser) {
      res.json({ message: "Entry added" });
    } else {
      res.redirect("/entries/list");
    }
  });
};

// 消息列表
exports.entries = (req, res, next) => {
  const page = req.page;
  Entry.getRange(page.from, page.to, (err, entries) => {
    if (err) return next(err);
    // req.json(entries);
    res.format(
      {
        "application/json": () => {
          res.send(entries);
        }
      },
      {
        "application/xml": () => {
          res.write("<entries>\n");
          entries.forEach(entry => {
            res.write(
              ```
              <entry>
                <title>${entry.title}</title>
                <body>${entry.body}</body>
                <username>${entry.username}</username>
              </entry>
            ```
            );
          });
          res.end("</entries>");
        }
      }
    );
  });
};
