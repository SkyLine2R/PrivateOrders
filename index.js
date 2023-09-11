/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const createError = require("http-errors");
const express = require("express");
// const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

const { expressjwt: jwt } = require("express-jwt");
const WORD_FOR_TOKEN = require("./Environment-setting/WORD_FOR_TOKEN");
const attachCurrentUser = require("./middlewares/attachCurrentUser");

app.set("port", process.env.PORT || 3000);

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/css/bootstrap.css",
  express.static("node_modules/bootstrap/dist/css/bootstrap.css")
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", require("./routes/index"));
app.use("/login", require("./routes/login"));
app.use(
  "/api",
  jwt({
    secret: WORD_FOR_TOKEN,
    algorithms: ["HS256"],
  }),
  attachCurrentUser,
  require("./routes/api")
);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
// catch 404 and forward to error handler
/* app.use(function (req, res, next) {
  next(createError(404)); 
}); */

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log("App started on port", app.get("port"));
});

module.exports = app;
