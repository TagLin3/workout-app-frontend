import {
  useState, useMemo, useEffect,
} from "react";
import { Outlet, useNavigate, useLoaderData } from "react-router-dom";
import axios from "axios";
import { ThemeProvider } from "@emotion/react";
import {
  createTheme, Box, Typography, Button,
  CssBaseline,
} from "@mui/material";
import Nav from "../components/Nav";
import Notification from "../components/Notification";
import { UnfinishedWorkoutContext, NotificationContext, LoggedUserContext } from "../contexts";

const Root = () => {
  const [unfinishedWorkout, setUnfinishedWorkout] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [notification, setNotification] = useState({ message: null });
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

  const showNotification = (notificationToSet, length) => {
    setNotification(notificationToSet);
    setTimeout(() => {
      setNotification({ message: null });
    }, length);
  };

  const logOut = () => {
    setLoggedUser(null);
    window.localStorage.removeItem("workoutAppLoggedUser");
    axios.defaults.headers.common.Authorization = undefined;
    navigate("/login");
    showNotification({ message: "Logged out!", severity: "success" }, 3000);
  };

  const unfinishedWorkoutObj = useMemo(() => (
    { unfinishedWorkout, setUnfinishedWorkout }), [unfinishedWorkout]);
  const loggedUserObj = useMemo(() => (
    { loggedUser, setLoggedUser }), [loggedUser]);
  const notificationArray = useMemo(() => (
    { notification, showNotification }), [notification]);

  const theme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#303030",
        paper: "#3C3C3C",
      },
      text: {
        primary: "#FFFFFF",
        secondary: "#DDDDDD",
      },
      primary: {
        main: "#EACF00",
      },
      secondary: {
        main: "#001BEA",
      },
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            margin: 5,
          },
          h1: {
            fontSize: 40,
          },
          h2: {
            fontSize: 35,
          },
          h3: {
            fontSize: 30,
          },
          h4: {
            fontSize: 25,
          },
          h5: {
            fontSize: 20,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            margin: 5,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            margin: 5,
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
      <CssBaseline>
        <UnfinishedWorkoutContext.Provider value={unfinishedWorkoutObj}>
          <LoggedUserContext.Provider value={loggedUserObj}>
            <NotificationContext.Provider value={notificationArray}>
              <Box marginLeft=".5rem" marginRight=".5rem">
                <Nav unfinishedWorkout={unfinishedWorkout} loggedUser={loggedUser} />
                {loggedUser && (
                  <Typography>
                    Logged in as
                    {" "}
                    {loggedUser.name}
                    {" "}
                    <Button type="button" onClick={logOut}>Log out</Button>
                  </Typography>
                )}
                <Notification message={notification.message} severity={notification.severity} />
                <Outlet />
              </Box>
            </NotificationContext.Provider>
          </LoggedUserContext.Provider>
        </UnfinishedWorkoutContext.Provider>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default Root;
