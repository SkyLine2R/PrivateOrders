const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const Item = require("./db.js");

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json()); //поддержка тела запросов в JSON
app.use(bodyParser.urlencoded({ extended: true })); //поддержка тела запросов в кодировке формы

app.set("view engine", `ejs`);

/* app.use(
  "/css/bootstrap.css",
  express.static("node_modules/bootstrap/dist/css/bootstrap.css")
); */

/* res.format({
  html: () => {
    res.render("vendor-code.ejs", { articles: articles });
  },
  json: () => {
    res.send(articles);
  },
});
 */
app.get("/", function (req, res) {
  res.render("vendor-code");
});

app.get("/items", (req, res, err) => {
  res.render("vendor-code", { aaa: "asdfasdf" });
  //res.setHeader("Content-type", "text/html");

  /*     Item.all()
    .then((items) => {
      return res.json(items);
    })
    .catch((err) => {
      console.error(err);
      return res.json({
        success: false,
        message: "Ошибка при получении данных...",
      });
    }); */
}); //получить все артикулы

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
