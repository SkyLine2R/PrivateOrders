export const startSession = (user) => {
  sessionStorage.setItem("login", user.login);
  sessionStorage.setItem("name", user.name);
  sessionStorage.setItem("accessLevel", user.accessLevel);
  sessionStorage.setItem("accessToken", user.token);
};

export const getSession = () => ({
  login: sessionStorage.getItem("login") || "",
  name: sessionStorage.getItem("name") || "",
  accessLevel: +sessionStorage.getItem("accessLevel") || null,
  accessToken: sessionStorage.getItem("accessToken") || null,
});

export const endSession = () => {
  sessionStorage.clear();
};

export const isLoggedIn = () => getSession().accessToken;
