import {
  createContext, useState, useMemo, useEffect,
} from "react";
import { Outlet, useNavigate, useLoaderData } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav";
import Notification from "../components/Notification";

export const UnfinishedWorkoutContext = createContext(null);
export const LoggedUserContext = createContext(null);
export const NotificationContext = createContext(null);

const Root = () => {
  const [unfinishedWorkout, setUnfinishedWorkout] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const loaderData = useLoaderData();

  useEffect(() => {
    const unfinishedWorkoutInStorage = JSON.parse(window.localStorage.getItem("workoutAppUnfinishedWorkout"));
    if (unfinishedWorkoutInStorage && Date.now() < unfinishedWorkoutInStorage.expirationDate) {
      setUnfinishedWorkout(unfinishedWorkoutInStorage);
    } else if (unfinishedWorkoutInStorage) {
      window.localStorage.removeItem("workoutAppUnfinishedWorkout");
      window.localStorage.removeItem("workoutAppUnfinishedWorkoutSets");
    }
  }, []);

  useEffect(() => {
    setLoggedUser(loaderData);
  }, []);

  const logOut = () => {
    setLoggedUser(null);
    window.localStorage.removeItem("workoutAppLoggedUser");
    axios.defaults.headers.common.Authorization = undefined;
    navigate("/login");
    setNotification("Logged out!");
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const unfinishedWorkoutObj = useMemo(() => (
    { unfinishedWorkout, setUnfinishedWorkout }), [unfinishedWorkout]);
  const loggedUserObj = useMemo(() => (
    { loggedUser, setLoggedUser }), [loggedUser]);
  const notificationArray = useMemo(() => (
    { notification, setNotification }), [notification]);

  return (
    <UnfinishedWorkoutContext.Provider value={unfinishedWorkoutObj}>
      <LoggedUserContext.Provider value={loggedUserObj}>
        <NotificationContext.Provider value={notificationArray}>
          <div>
            <Nav unfinishedWorkout={unfinishedWorkout} />
            {loggedUser && (
              <p>
                logged in as
                {" "}
                {loggedUser.name}
                {" "}
                <button type="button" onClick={logOut}>Log out</button>
              </p>
            )}
            <Notification message={notification} />
            <Outlet />
          </div>
        </NotificationContext.Provider>
      </LoggedUserContext.Provider>
    </UnfinishedWorkoutContext.Provider>
  );
};

export default Root;
