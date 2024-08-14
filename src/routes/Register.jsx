import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Button, TextField, Typography,
} from "@mui/material";
import loginService from "../services/loginService";
import userService from "../services/userService";
import { LoggedUserContext, NotificationContext } from "../contexts";

const Register = () => {
  const { setLoggedUser } = useContext(LoggedUserContext);
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const onSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const username = event.target.username.value;
    const password = event.target.password.value;
    if (!name || !password || !username) {
      showNotification({
        message: "Error: Name, username and passowrd are all required",
        severity: "error",
      }, 3000);
    } else {
      try {
        await userService.addUser({ name, username, password });
        await loginService.login(event.target.username.value, event.target.password.value);
        const loggedUser = await loginService.login(
          event.target.username.value,
          event.target.password.value,
        );
        axios.defaults.headers.common.Authorization = `Bearer ${loggedUser.token}`;
        setLoggedUser(loggedUser);
        window.localStorage.setItem("workoutAppLoggedUser", JSON.stringify(loggedUser));
        navigate("/");
      } catch (e) {
        if (e.response.data.error.startsWith("User validation failed: username: Error, expected `username` to be unique.")) {
          showNotification({
            message: "Error: Username already in use",
            severity: "error",
          }, 3000);
        }
      }
    }
  };
  return (
    <Box>
      <Typography variant="h2">Register</Typography>
      <form onSubmit={onSubmit}>
        <TextField label="name" type="text" name="name" />
        <br />
        <TextField label="username" type="text" name="username" />
        <br />
        <TextField label="password" type="password" name="password" />
        <br />
        <Button type="submit" variant="contained">register</Button>
      </form>
    </Box>
  );
};

export default Register;
