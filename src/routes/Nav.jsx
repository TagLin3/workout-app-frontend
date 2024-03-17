import { createContext, useState, useMemo } from "react";
import { Link, Outlet } from "react-router-dom";

export const UnfinishedWorkoutContext = createContext(null);

const Root = () => {
  const [unfinishedWorkout, setUnfinishedWorkout] = useState(
    JSON.parse(window.localStorage.getItem("workoutAppUnfinishedWorkout")),
  );
  const obj = useMemo(() => ({ unfinishedWorkout, setUnfinishedWorkout }), [unfinishedWorkout]);
  return (
    <UnfinishedWorkoutContext.Provider value={obj}>
      <div>
        <nav>
          <Link to="/">home</Link>
          {" "}
          <Link to="/routines">Workout routines</Link>
          {" "}
          <Link to="/exercise_library">Exercise library</Link>
          {" "}
          <Link to="/past_workouts">Past workouts</Link>
          {" "}
          {unfinishedWorkout && (
            <Link to={`/routines/${unfinishedWorkout.routine.id}/new_workout`}>
              {`Unfinised ${unfinishedWorkout.routine.name}`}
            </Link>
          )}
        </nav>
        <Outlet />
      </div>
    </UnfinishedWorkoutContext.Provider>
  );
};

export default Root;
