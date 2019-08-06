const env = process.env.NODE_ENV || "development";

const errorHandler = (err, req, res, next) => {
  res.statusCode = 500;
  if (env == "development") {
    console.error("error occurs");
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify(err));
  } else {
    res.end("Server Error");
  }
};

module.exports = errorHandler;
