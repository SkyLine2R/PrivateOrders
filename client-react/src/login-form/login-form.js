import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import { startSession } from "../components/session";
import textСorrectionInField from "../../../components/textCorrectionForInput";
import dbSchema from "../../../components/users-db_schema";
import useAuth from "../hooks/useAuth";
import signInUser from "../components/signInUser";

export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [error, setError] = React.useState("");
  const [login, setLogin] = React.useState("");
  const [pass, setPass] = React.useState("");

  const handleSubmit = async (e) => {
    // validate the inputs
    if (!login || !pass) {
      setError("Пожалуйста введите логин и пароль.");
      return;
    }
    const authResult = await signInUser({ login, pass });
    console.log(authResult);

    if (authResult?.error?.length)
      alert(authResult.error); // setError(authResult?.error);
    else return authResult.data;

    // clear the errors
    /*     setError("");
    setAuth(true);
    navigate(from, { replace: true });
    // send the login request
    try {
      const loginResponse = await signInUser(login, pass);
      startSession(loginResponse.user);
      navigate("/user");
    } catch (error) {
      setError(error.message);
    }
    console.log("Logging in..."); */
  };

  return (
    <Box>
      <Typography
        variant="h1"
        align="center"
        sx={{ opacity: "0.01", padding: "20px", letterSpacing: "1rem" }}
      >
        АВТОРИЗАЦИЯ
      </Typography>
      <Paper
        elevation={3}
        sx={{
          width: "30ch",
          padding: "20px 30px",
          margin: "0px auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "20px",
          }}
        >
          <AccountCircle
            fontSize="large"
            sx={{
              margin: "0 auto",
              color: "action.active",
            }}
          />
        </Box>
        <Typography variant="body1" align="center">
          Войдите в систему.
        </Typography>
        <Box
          sx={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <TextField
            id="input-with-sx"
            label="Логин"
            variant="standard"
            sx={{ width: "100%", paddingBottom: "20px" }}
            value={login}
            onChange={(e) => {
              const corrText = textСorrectionInField(
                dbSchema.login,
                e.target.value
              );
              setLogin(corrText);
            }}
          />

          <FormControl sx={{ width: "100%" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Пароль
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              value={pass}
              onChange={(e) => {
                const corrText = textСorrectionInField(
                  dbSchema.pass,
                  e.target.value
                );
                setPass(corrText);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>

        <Box
          sx={{
            marginTop: "35px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="text"
            disabled={!(login && pass)}
            onClick={handleSubmit}
          >
            Авторизоваться
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
