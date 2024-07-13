import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import loginService from "../services/loginService";
import { LoggedUserContext, NotificationContext } from "../contexts";

const Login = () => {
  const navigate = useNavigate();
  const { setLoggedUser } = useContext(LoggedUserContext);
  const { setNotification } = useContext(NotificationContext);

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
      setNotification("Username and password don't match");
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={onSubmit}>
        username:
        {" "}
        <input type="text" name="username" />
        <br />
        password:
        {" "}
        <input type="password" name="password" />
        <br />
        <button type="submit">log in</button>
      </form>
    </div>
  );
};

export default Login;
