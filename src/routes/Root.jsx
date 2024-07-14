import {
  useState, useMemo, useEffect,
} from "react";
import { Outlet, useNavigate, useLoaderData } from "react-router-dom";
import axios from "axios";
import { ThemeProvider } from "@emotion/react";
import {
  createTheme, Box, Typography, Button,
} from "@mui/material";
import Nav from "../components/Nav";
import Notification from "../components/Notification";
import { UnfinishedWorkoutContext, NotificationContext, LoggedUserContext } from "../contexts";

const Root = () => {
  const [unfinishedWorkout, setUnfinishedWorkout] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const loaderData = useLoaderData();

  useEffect(() => {
    setUnfinishedWorkout(JSON.parse(window.localStorage.getItem("workoutAppUnfinishedWorkout")));
  }, []);

  useEffect(() => {
    if (loaderData && Date.now() < loaderData.expiresAt) {
      setLoggedUser(loaderData);
    }
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

  const theme = createTheme({
    components: {
      MuiTypography: {
        styleOverrides: {
          h1: {
            fontSize: 60,
          },
          h2: {
            fontSize: 40,
          },
          h3: {
            fontSize: 30,
          },
        },
      },
    },
    typography: {
      fontFamily: "sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <UnfinishedWorkoutContext.Provider value={unfinishedWorkoutObj}>
        <LoggedUserContext.Provider value={loggedUserObj}>
          <NotificationContext.Provider value={notificationArray}>
            <Box>
              <Nav unfinishedWorkout={unfinishedWorkout} loggedUser={loggedUser} />
              {loggedUser && (
                <Typography>
                  logged in as
                  {" "}
                  {loggedUser.name}
                  {" "}
                  <Button type="button" onClick={logOut}>Log out</Button>
                </Typography>
              )}
              <Notification message={notification} />
              <Outlet />
            </Box>
          </NotificationContext.Provider>
        </LoggedUserContext.Provider>
      </UnfinishedWorkoutContext.Provider>
    </ThemeProvider>
  );
};

export default Root;
