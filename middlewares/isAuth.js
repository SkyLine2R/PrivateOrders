const { expressjwt: jwt } = require("express-jwt");

const WORD_FOR_TOKEN = require("../components/WORD_FOR_TOKEN");

const getTokenFromHeader = ({ headers }) => {
  if (
    headers.Authorization &&
    headers.Authorization.split(" ")[0] === "Bearer"
  ) {
    return headers.Authorization.split(" ")[1];
  }
};

exports.default = jwt({
  secret: WORD_FOR_TOKEN,
  algorithms: ["RS256"],
  user: "token", // Здесь следующее промежуточное ПО сможет найти то, что было закодировано в services/auth:generateToken -> 'req.token'
  getToken: getTokenFromHeader, // Функция для получения токена аутентификации из запроса
});
