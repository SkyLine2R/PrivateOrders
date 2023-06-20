module.exports = (req, res, level) => {
  if (+req.auth.accessLevel < level) {
    return res.json({
      error: "Нет разрешения для выполнения этой операции",
    });
  }
  return false;
};
