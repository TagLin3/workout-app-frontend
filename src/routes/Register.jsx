import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Button, TextField, Typography,
} from "@mui/material";
import loginService from "../services/loginService";
import userService from "../services/userService";
import { LoggedUserContext } from "../contexts";

const Register = () => {
  const { setLoggedUser } = useContext(LoggedUserContext);
  const navigate = useNavigate();
  const onSubmit = async (event) => {
    event.preventDefault();
    await userService.addUser({
      name: event.target.name.value,
      username: event.target.username.value,
      password: event.target.password.value,
    });
    await loginService.login(event.target.username.value, event.target.password.value);
    const loggedUser = await loginService.login(
      event.target.username.value,
      event.target.password.value,
    );
    axios.defaults.headers.common.Authorization = `Bearer ${loggedUser.token}`;
    setLoggedUser(loggedUser);
    window.localStorage.setItem("workoutAppLoggedUser", JSON.stringify(loggedUser));
    navigate("/");
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
