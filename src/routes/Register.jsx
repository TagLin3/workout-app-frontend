import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../services/loginService";
import userService from "../services/userService";
import { LoggedUserContext } from "./Root";

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
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        name:
        {" "}
        <input type="text" name="name" />
        <br />
        username:
        {" "}
        <input type="text" name="username" />
        <br />
        password:
        {" "}
        <input type="password" name="password" />
        <br />
        <button type="submit">register</button>
      </form>
    </div>
  );
};

export default Register;
