import {
  Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { useContext, useState } from "react";
import userService from "../services/userService";
import { LoggedUserContext, NotificationContext } from "../contexts";

const UserPage = () => {
  const { setLoggedUser, loggedUser } = useContext(LoggedUserContext);
  const { showNotification } = useContext(NotificationContext);
  const user = useLoaderData();
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const finishEditing = async () => {
    try {
      await userService.updateUser(user.id, { username, name });
      if (user.id === loggedUser.id) {
        const newLoggedUser = { ...loggedUser, name, username };
        setLoggedUser(newLoggedUser);
        window.localStorage.setItem("workoutAppLoggedUser", JSON.stringify(newLoggedUser));
      }
      setEditing(false);
    } catch (e) {
      showNotification({
        message: "Error: Username already in use",
        severity: "error",
      }, 3000);
    }
  };
  const changePassword = async (event) => {
    event.preventDefault();
    try {
      await userService.changePassword(
        user.id,
        event.target.oldPassword.value,
        event.target.newPassword.value,
      );
      showNotification({
        message: "Password changed!",
        severity: "success",
      }, 3000);
      setChangingPassword(false);
    } catch (e) {
      showNotification({
        message: "Error: Old password incorrect",
        severity: "error",
      }, 3000);
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
    >
      <Typography variant="h2">Your information:</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>Name</Typography>
            </TableCell>
            <TableCell>
              <Typography>Username</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              {
                editing
                  ? (
                    <TextField
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  )
                  : <Typography>{name}</Typography>
              }
            </TableCell>
            <TableCell>
              {
                editing
                  ? (
                    <TextField
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  )
                  : <Typography>{username}</Typography>
              }
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {
        editing
          ? (
            <Box
              display="flex"
              flexDirection="row"
            >
              <Button
                sx={{ flexGrow: 1 }}
                variant="contained"
                onClick={finishEditing}
                color="success"
              >
                submit
              </Button>
              <Button
                sx={{ flexGrow: 1 }}
                variant="contained"
                onClick={() => setEditing(false)}
                color="error"
              >
                cancel
              </Button>
            </Box>
          )
          : (
            <Button variant="contained" onClick={() => setEditing(true)}>
              edit information
            </Button>
          )
      }
      <Button variant="contained" onClick={() => setChangingPassword(true)}>
        change password
      </Button>
      {
        changingPassword
        && (
          <form onSubmit={changePassword}>
            <Box
              display="flex"
              flexDirection="column"
            >
              <TextField type="password" id="oldPassword" />
              <TextField type="password" id="newPassword" />
              <Box
                display="flex"
                flexDirection="row"
              >
                <Button
                  sx={{ flexGrow: 1 }}
                  variant="contained"
                  type="submit"
                  color="success"
                >
                  submit
                </Button>
                <Button
                  sx={{ flexGrow: 1 }}
                  variant="contained"
                  onClick={() => setChangingPassword(false)}
                  color="error"
                >
                  cancel
                </Button>
              </Box>
            </Box>
          </form>
        )
      }
    </Box>
  );
};

export default UserPage;
