import { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { UnfinishedWorkoutContext } from "./Nav";

const SingleRoutine = () => {
  const { unfinishedWorkout, setUnfinishedWorkout } = useContext(UnfinishedWorkoutContext);
  const deleteUnfinisedWorkout = () => {
    window.localStorage.removeItem("workoutAppUnfinishedWorkoutSets");
    window.localStorage.removeItem("workoutAppUnfinishedWorkout");
    setUnfinishedWorkout(null);
  };
  const routine = useLoaderData();
  return (
    <div>
      <h1>
        {routine.name}
      </h1>
      <h2>Exercises</h2>
      <ul>
        {routine.exercises.map((exercise) => (
          <li key={exercise.id}>
            {exercise.name}
          </li>
        ))}
      </ul>
      {unfinishedWorkout
        ? (
          <div>
            You currently have an unfinished workout of this routine.
            <br />
            You can
            {" "}
            <Link to="new_workout">continue the workout</Link>
            {" "}
            or
            {" "}
            <Link
              to="/routines"
              state={{ newWorkoutState: "Workout deleted!" }}
              onClick={deleteUnfinisedWorkout}
            >
              delete it
            </Link>
          </div>
        )
        : <Link to="new_workout">Start new workout from this routine</Link>}
    </div>
  );
};

export default SingleRoutine;
