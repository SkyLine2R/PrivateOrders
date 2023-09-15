// Таблица зависимостей для автоматического подтаскивания (joinLeft)
// значений из связанных таблиц
// ключ - текущая таблица
// next - следующая связанная таблица
// dependencies - связанные колонки
module.exports = {
  inStock: { next: "stock", dependencies: ["inStock.stock", "stock.id"] },
  outStock: { next: "stock", dependencies: ["outStock.stock", "stock.id"] },
  stock: {
    next: "colors",
    dependencies: ["stock.color", "colors.id"],
  },
  colors: {
    next: "vendorCodes",
    dependencies: ["stock.vendorCode", "vendorCodes.id"],
  },
  vendorCodes: {
    next: "units",
    dependencies: ["vendorCodes.unit", "units.id"],
  },
};
