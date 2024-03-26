import { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { UnfinishedWorkoutContext } from "./Nav";

const SingleRoutine = () => {
  const { unfinishedWorkout, setUnfinishedWorkout } = useContext(UnfinishedWorkoutContext);
  const routine = useLoaderData();

  const deleteUnfinisedWorkout = () => {
    window.localStorage.removeItem("workoutAppUnfinishedWorkoutSets");
    window.localStorage.removeItem("workoutAppUnfinishedWorkout");
    setUnfinishedWorkout(null);
  };

  const startNewWorkout = () => {
    const unfinishedWorkoutToSave = {
      routine: {
        id: routine.id,
        name: routine.name,
      },
    };
    setUnfinishedWorkout(unfinishedWorkoutToSave);
    window.localStorage.setItem("workoutAppUnfinishedWorkout", JSON.stringify(
      { ...unfinishedWorkoutToSave, expirationDate: Date.now() + 1000 * 60 * 60 * 10 },
    ));
  };

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
            You currently have an unfinished workout of the routine &quot;
            {unfinishedWorkout.routine.name}
            &quot;. You can&apos;t start a new workout until you&apos;ve finished the old one.
            <br />
            You can
            {" "}
            <Link to={`/routines/${unfinishedWorkout.routine.id}/new_workout`}>continue the workout</Link>
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
        : <Link onClick={startNewWorkout} to="new_workout">Start new workout from this routine</Link>}
    </div>
  );
};

export default SingleRoutine;
