module.exports = (req, res, level) => {
  if (+req.auth.accessLevel < level) {
    return res.json({
      error: "Нет прав доступа для этой операции",
    });
  }
  return false;
};
