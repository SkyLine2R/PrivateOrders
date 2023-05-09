export const startSession = (user) => {
  sessionStorage.setItem("login", user.login);
  sessionStorage.setItem("name", user.name);
  sessionStorage.setItem("accessToken", user.accessToken);
};

export const getSession = () => ({
  login: sessionStorage.getItem("login"),
  name: sessionStorage.getItem("name"),
  accessToken: sessionStorage.getItem("accessToken"),
});

export const endSession = () => {
  sessionStorage.clear();
};

export const isLoggedIn = () => getSession().accessToken;
