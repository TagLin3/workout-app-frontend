import { useState } from "react";
import {
  AppBar, Button, Menu, MenuItem, Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";

const MobileNav = ({ loggedUser, unfinishedWorkout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Button onClick={handleOpen}>menu</Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} component={Link} to="/">Home</MenuItem>
          {loggedUser && [
            <MenuItem key="routines" onClick={handleClose} component={Link} to="/routines">
              Workout routines
            </MenuItem>,
            <MenuItem key="exercise_library" onClick={handleClose} component={Link} to="/exercise_library">
              Exercise library
            </MenuItem>,
            <MenuItem key="past_workouts" onClick={handleClose} component={Link} to="/past_workouts">
              Past workouts
            </MenuItem>,
            <MenuItem key="past_sets" onClick={handleClose} component={Link} to="/past_sets">
              Past sets
            </MenuItem>,
            <MenuItem key="user" onClick={handleClose} component={Link} to={`/user/${loggedUser.id}`}>
              {loggedUser.username}
            </MenuItem>,
          ]}
          <MenuItem onClick={handleClose} component={Link} to="/login">
            Log in
          </MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/register">
            Register
          </MenuItem>
          {unfinishedWorkout && (
            <MenuItem
              onClick={handleClose}
              component={Link}
              to={`/routines/${unfinishedWorkout.routine.id}/new_workout`}
            >
              {`Unfinised ${unfinishedWorkout.routine.name}`}
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default MobileNav;
