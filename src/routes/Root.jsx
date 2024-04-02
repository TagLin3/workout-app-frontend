import {
  createContext, useState, useMemo, useEffect,
} from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav";

export const UnfinishedWorkoutContext = createContext(null);
export const loggedUserContext = createContext(null);

const Root = () => {
  const [unfinishedWorkout, setUnfinishedWorkout] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);

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
    const loggedUserInStorage = JSON.parse(window.localStorage.getItem("workoutAppLoggedUser"));
    if (loggedUserInStorage) {
      setLoggedUser(loggedUserInStorage);
      axios.defaults.headers.common.Authorization = `Bearer ${loggedUserInStorage.token}`;
    }
  }, []);

  const logOut = () => {
    setLoggedUser(null);
    window.localStorage.removeItem("workoutAppLoggedUser");
    axios.defaults.headers.common.Authorization = undefined;
  };

  const unfinishedWorkoutObj = useMemo(() => (
    { unfinishedWorkout, setUnfinishedWorkout }), [unfinishedWorkout]);
  const loggedUserObj = useMemo(() => (
    { loggedUser, setLoggedUser }), [loggedUser]);

  return (
    <UnfinishedWorkoutContext.Provider value={unfinishedWorkoutObj}>
      <loggedUserContext.Provider value={loggedUserObj}>
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
          <Outlet />
        </div>
      </loggedUserContext.Provider>
    </UnfinishedWorkoutContext.Provider>
  );
};

export default Root;
