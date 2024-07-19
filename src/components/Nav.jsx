import { AppBar, Toolbar, Button } from "@mui/material";

const Nav = ({ unfinishedWorkout, loggedUser }) => (
  <AppBar position="static">
    <Toolbar>
      <Button placement="navBar" variant="contained" href="/">Home</Button>
      {loggedUser && (
        <>
          <Button placement="navBar" href="/routines" variant="contained">Workout routines</Button>
          <Button placement="navBar" href="/exercise_library" variant="contained">Exercise library</Button>
          <Button placement="navBar" href="/past_workouts" variant="contained">Past workouts</Button>
          <Button placement="navBar" href="/past_sets" variant="contained">Past sets</Button>
        </>
      )}
      {" "}
      <Button placement="navBar" href="/login" variant="contained">Log in</Button>
      {" "}
      <Button placement="navBar" href="/register" variant="contained">Register</Button>
      {" "}
      {unfinishedWorkout && (
        <Button placement="navBar" href={`/routines/${unfinishedWorkout.routine.id}/new_workout`} variant="contained">
          {`Unfinised ${unfinishedWorkout.routine.name}`}
        </Button>
      )}
    </Toolbar>
  </AppBar>
);

export default Nav;
