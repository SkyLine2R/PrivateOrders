/* eslint-disable consistent-return */
const DB = require("./db");
const dbSchema = require("../components/db_schema_for_testing/db_schema-in-out-stock");
const testingDataFromInput = require("../components/testing-data-from-input");

const table = "inStock";

const respCol = [
  "inStock.id",
  "vendorCodes.vendorCode",
  "vendorCodes.name",
  "vendorCodes.unit",
  "vendorCodes.quantity",
  "units.name as unit",
  "stock.color",
  "inStock.amount",
  "colors.name as colorName",
];

async function getAll(req, res) {
  try {
    console.log(req.body);
    const resp = await DB.getAllEntries({
      table,
      respCol,
      /*       customer: req.body.customer,
       */ document: req.body.document,
    });
    return res.json(resp);
  } catch (e) {
    res.status(400).json({ error: "Ошибка БД при получении материалов" });
  }
}

async function getFiltered(req, res) {
  try {
    const resp = await DB.findEntriesForQuickFilterForStock({
      ...req.body.data,
      table,
      respCol,
      customer: req.body.customer,
    });
    return res.json(resp);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(400).json({ error: "Ошибка БД при получении материалов" });
  }
}

async function add(req, res) {
  try {
    const itemData = testingDataFromInput(dbSchema, req.body.data);

    if (itemData?.error) throw new Error(itemData.error);

    // если не указан id материала на складе
    // попробуем найти такой по характеристикам и добавим id в тело запроса
    if (!req.body?.data?.stockId) {
      const [materialInDb] = await DB.findEntries({
        table: "stock",
        searchData: {
          customer: req.body.customer,
          vendorCode: req.body.data.vendorCodeId,
          color: +req.body.data.stockColor || null,
        },
      });
      if (materialInDb?.id) req.body.data.stockId = materialInDb.id;
    }
    if (!req.body?.data?.stockId) {
      // если нужного материала нет на складе - создадим новую запись
      const [itemId] = await DB.addEntry({
        table: "stock",
        dataObj: {
          customer: req.body.customer,
          vendorCode: req.body.data.vendorCodeId,
          color: +req.body.data.stockColor || null,
          amount: +req.body.data.stockAmount,
          createdBy: req.auth.id,
          updatedBy: req.auth.id,
        },
        respCol: ["id"],
      });
      if (!itemId?.id) throw new Error("Ошибка при добавлении материала");
      req.body.data.stockId = itemId.id;
    } else {
      // если материал есть на складе - обновим количество
      const [upd] = await DB.changeAmount({
        table: "stock",
        id: req.body.data.stockId,
        addAmount: +req.body.data.stockAmount,
      });
      if (upd?.error) throw new Error(upd.error);
    }
    // Добавим запись о приходе в БД документов
    const [upd] = await DB.addEntry({
      table,
      dataObj: {
        stock: req.body.data.stockId,
        document: req.body.data.document,
        amount: +req.body.data.stockAmount,
        createdBy: req.auth.id,
        updatedBy: req.auth.id,
      },
    });
    return res.json(upd);
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ error: `Ошибка при добавлении записи. \n ${e.message}` });
  }
}

async function edit(req, res) {
  try {
    const itemData = testingDataFromInput(
      { ...vendorCodesDbSchema, id: null },
      req.body.data
    );

    if (itemData.error) return res.json(itemData.error);

    const item = (
      await DB.editEntry({
        table,
        dataObj: {
          ...itemData,
          updatedBy: req.auth.id,
          updatedAt: Date.now(),
        },
        respCol: ["id", "vendorCode"],
      })
    )[0];

    return res.json(item);
  } catch (e) {
    res.status(400).json({ error: "Ошибка при изменении данных артикула" });
  }
}

async function del(req, res) {
  try {
    console.log(req.body);
    const [materialToChange] = await DB.findEntries({
      table: "inStock",
      searchData: {
        id: req.body.data.id,
      },
      respCol: ["stock", "amount"],
    });
    console.log("materialToChange");
    console.log(materialToChange);
    const changeResult = await DB.changeAmount({
      table: "stock",
      id: materialToChange.stock,
      addAmount: materialToChange.amount * -1,
    });

    if (changeResult.error) throw new Error(changeResult.error);

    const item = await DB.delEntry({
      table,
      id: req.body.data.id,
    });
    return res.json(item);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(400).json({ error: "Ошибка при удалении записи" });
  }
}

module.exports = {
  getFiltered,
  getAll,
  add,
  edit,
  del,
};