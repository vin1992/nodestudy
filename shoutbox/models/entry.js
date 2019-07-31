const redis = require("redis");
const db = redis.createClient();

class Entry {
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];
    }
  }

  // 保存
  save(cb) {
    const entryJSON = JSON.stringify(this);
    db.lpush("entries", entryJSON, err => {
      if (err) return cb(err);
      cb();
    });
  }

  // 分页获取 列表
  static getRange(from, to, cb) {
    db.lrange("entries", from, to, (err, items) => {
      if (err) return cb(err);
      let entries = [];
      items.forEach(item => {
        entries.push(JSON.parse(item));
      });

      cb(null, entries);
    });
  }
}

module.exports = Entry;
