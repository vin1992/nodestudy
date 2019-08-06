function parseField(req) {
  console.log("body", req.body);
  return Object.keys(req.body.entry);
}

function validField(req, field, len) {
  let val = req.body.entry;
  return field.every(props => val[props] && val[props].length >= len);
}

exports.valid = len => {
  return (req, res, next) => {
    let field = parseField(req);
    console.log("parseField", field, validField(req, field, len));

    if (validField(req, field, len)) {
      next();
    } else {
      // res.error(`${field.join(" ")} length is not enough`);
      res.redirect("/back");
    }
  };
};
