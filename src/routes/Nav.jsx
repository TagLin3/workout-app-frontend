import {
  createContext, useState, useMemo, useEffect,
} from "react";
import { Link, Outlet } from "react-router-dom";

export const UnfinishedWorkoutContext = createContext(null);

const Nav = () => {
  const [unfinishedWorkout, setUnfinishedWorkout] = useState(null);
  useEffect(() => {
    const unfinishedWorkoutInStorage = JSON.parse(window.localStorage.getItem("workoutAppUnfinishedWorkout"));

    if (unfinishedWorkoutInStorage && Date.now() < unfinishedWorkoutInStorage.expirationDate) {
      setUnfinishedWorkout(unfinishedWorkoutInStorage);
    } else if (unfinishedWorkoutInStorage) {
      window.localStorage.removeItem("workoutAppUnfinishedWorkout");
      window.localStorage.removeItem("workoutAppUnfinishedWorkoutSets");
    }
  }, []);
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

export default Nav;
