const createError = require("http-errors");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const Item = require("./db.js");

const app = express();

app.set("port", process.env.PORT || 3000);

// view engine setup
//app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/items", require("./routes/items"));
app.use("/api", require("./routes/api"));

// catch 404 and forward to error handler
/* app.use(function (req, res, next) {
  next(createError(404));
}); */

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

/* app.use(
  "/css/bootstrap.css",
  express.static("node_modules/bootstrap/dist/css/bootstrap.css")
); */

app.post("/items", (req, res, next) => {
  Item.create({
    vendorСode: "333333",
    name: "name content",
    unit: "м",
    length: 6.5,
    notes: "поле для примечаний",
  })
    .then((resp) => {
      console.log(resp);
      res.send("Добавлено");
    })
    .catch((err) => {
      console.error(err);
      return res.json({
        success: false,
        message: "Ошибка при добавлении артикула...",
      });
    });
}); //добавить артикул

app.get("/vendorCode/:vendorCode", (req, res, next) => {
  Item.findVendorСode(req.params.vendorCode)
    .then((items) => {
      return res.json(items);
    })
    .catch((err) => {
      console.error(err);
      return res.json({
        success: false,
        message: "Ошибка при получении данных...",
      });
    });
}); //получить один артикул

app.delete("/items/:id", (req, res, next) => {
  const id = req.params.id;
  console.log("Deleting:", id);
  delete items[id];
  res.send({ message: "Deleted" });
}); //удалить артикул

app.listen(app.get("port"), () => {
  console.log("App started on port", app.get("port"));
});

module.exports = app;

//стр85
//стр235
//стр91
//https://developer.mozilla.org/ru/docs/Learn/Server-side/Express_Nodejs/Tutorial_local_library_website
