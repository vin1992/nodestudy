const ejs = require("ejs");
ejs.delimiter = "$";
const template = "<$= message $>";
const ctx = { message: "<script>alert('XSS attack')</script>" };
console.log(ejs.render(template, ctx));
