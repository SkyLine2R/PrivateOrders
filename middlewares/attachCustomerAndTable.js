const attachCustomerAndTable = async (req, res, next) => {
  if (!req.body?.customer)
    return res.status(400).json({
      error: "В запросе не указан склад заказчика",
    });

  req.body.data = { ...req.body.data, customer: req.body.customer };
  req.body.table = req.url.slice(1);

  return next();
};

module.exports = attachCustomerAndTable;
