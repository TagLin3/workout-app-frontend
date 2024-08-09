import {
  AppBar, Toolbar, Button, Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const Nav = ({ unfinishedWorkout, loggedUser }) => {
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
        <Box
          display={{ xs: "none", md: "flex" }}
        >
          <Button component={Link} to="/">Home</Button>
          {loggedUser && (
            <>
              <Button component={Link} to="/routines">
                Workout routines
              </Button>
              <Button component={Link} to="/exercise_library">
                Exercise library
              </Button>
              <Button component={Link} to="/past_workouts">
                Past workouts
              </Button>
              <Button component={Link} to="/past_sets">
                Past sets
              </Button>
            </>
          )}
          <Button component={Link} to="/login">Log in</Button>
          <Button component={Link} to="/register">Register</Button>
          {unfinishedWorkout && (
            <Button
              component={Link}
              to={`/routines/${unfinishedWorkout.routine.id}/new_workout`}

            >
              {`Unfinised ${unfinishedWorkout.routine.name}`}
            </Button>
          )}
        </Box>
        <Box
          display={{ xs: "flex", md: "none" }}
        >
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
