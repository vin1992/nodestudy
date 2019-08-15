var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var logger = require("morgan");

// router
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var entriesRouter = require("./routes/entries");
var backRouter = require("./routes/back");
var registerRouter = require("./routes/register");
var loginRouter = require("./routes/login");

var Entry = require("./models/entry");

// moddleware
var messages = require("./middleware/message");
var user = require("./middleware/user");
var valid = require("./middleware/validate");
var page = require("./middleware/page");

// restful api
var api = require("./routes/api");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "ejs");
app.set("json spaces", 2);

if (app.get("env") === "production") {
  console.log("生产环境啊！");
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
  })
);

app.use("/api", api.auth);
app.use(user);
app.use(messages);
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/entries", entriesRouter);
app.use("/back", backRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.use("/api/user/:id", api.user);
app.use("/api/entries/:page?", page(Entry.count), api.entries);
app.use("/api/entry", valid.valid(10), api.add);

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
