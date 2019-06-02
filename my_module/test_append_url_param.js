const append = require("./append_url_param");

let url = "https://hd.ziroom.com/2019/yezhu_evaluate/evaluate.html?abc=21";

let params = {
  evaluateCode: "ssssa",
  houseSourceCode: "rwr2eerqw",
  token: "2412412dfsd",
  uid: "21312",
  channelCode: "zihome"
};

console.log("追加url参数", append(url, params, true));
