import {
  AppBar, Toolbar, Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const DesktopNav = ({ unfinishedWorkout, loggedUser }) => (
  <AppBar position="static">
    <Toolbar>
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
          <Button component={Link} to={`/user/${loggedUser.id}`}>
            {loggedUser.username}
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
    </Toolbar>
  </AppBar>
);

export default DesktopNav;
