import { Link } from "react-router-dom";

const Nav = ({ unfinishedWorkout, loggedUser }) => (
  <nav>
    <Link to="/">Home</Link>
    {loggedUser && (
      <>
        {" "}
        <Link to="/routines">Workout routines</Link>
        {" "}
        <Link to="/exercise_library">Exercise library</Link>
        {" "}
        <Link to="/past_workouts">Past workouts</Link>
        {" "}
        <Link to="/past_sets">Past sets</Link>
      </>
    )}
    {" "}
    <Link to="/login">Log in</Link>
    {" "}
    <Link to="/register">Register</Link>
    {" "}
    {unfinishedWorkout && (
      <Link to={`/routines/${unfinishedWorkout.routine.id}/new_workout`}>
        {`Unfinised ${unfinishedWorkout.routine.name}`}
      </Link>
    )}
  </nav>
);

export default Nav;
