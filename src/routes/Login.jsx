import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  Box, Button, TextField, Typography,
} from "@mui/material";
import loginService from "../services/loginService";
import { LoggedUserContext, NotificationContext } from "../contexts";

const Login = () => {
  const navigate = useNavigate();
  const { setLoggedUser } = useContext(LoggedUserContext);
  const { showNotification } = useContext(NotificationContext);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await loginService.login(
        event.target.username.value,
        event.target.password.value,
      );
      axios.defaults.headers.common.Authorization = `Bearer ${loggedUser.token}`;
      setLoggedUser(loggedUser);
      window.localStorage.setItem("workoutAppLoggedUser", JSON.stringify(loggedUser));
      navigate("/");
    } catch (err) {
      showNotification({
        severity: "error",
        message: "Error: Username and password don't match",
      }, 3000);
    }
  };

  return (
    <Box>
      <Typography variant="h2">Log in</Typography>
      <form onSubmit={onSubmit}>
        <TextField label="username" type="text" name="username" />
        <br />
        <TextField label="password" type="password" name="password" />
        <br />
        <Button variant="contained" type="submit">log in</Button>
      </form>
    </Box>
  );
};

export default Login;
