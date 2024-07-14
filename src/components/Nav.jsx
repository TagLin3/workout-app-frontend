import { AppBar, Toolbar, Button } from "@mui/material";

const Nav = ({ unfinishedWorkout, loggedUser }) => (
  <AppBar position="static">
    <Toolbar>
      <Button variant="contained" href="/">Home</Button>
      {loggedUser && (
        <>
          <Button href="/routines" variant="contained">Workout routines</Button>
          <Button href="/exercise_library" variant="contained">Exercise library</Button>
          <Button href="/past_workouts" variant="contained">Past workouts</Button>
          <Button href="/past_sets" variant="contained">Past sets</Button>
        </>
      )}
      {" "}
      <Button href="/login" variant="contained">Log in</Button>
      {" "}
      <Button href="/register" variant="contained">Register</Button>
      {" "}
      {unfinishedWorkout && (
        <Button href={`/routines/${unfinishedWorkout.routine.id}/new_workout`} variant="contained">
          {`Unfinised ${unfinishedWorkout.routine.name}`}
        </Button>
      )}
    </Toolbar>
  </AppBar>
);

export default Nav;
