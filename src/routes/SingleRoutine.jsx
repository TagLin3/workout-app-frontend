import { useContext } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { UnfinishedWorkoutContext, NotificationContext } from "./Root";
import workoutService from "../services/workoutService";

const SingleRoutine = () => {
  const { unfinishedWorkout, setUnfinishedWorkout } = useContext(UnfinishedWorkoutContext);
  const routine = useLoaderData();
  const { setNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  const deleteUnfinisedWorkout = () => {
    window.localStorage.removeItem("workoutAppUnfinishedWorkoutSets");
    window.localStorage.removeItem("workoutAppUnfinishedWorkout");
    setUnfinishedWorkout(null);
    setNotification("Workout deleted!");
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const startNewWorkout = async () => {
    const startedWorkout = await workoutService.addWorkout({ routine: routine.id });
    const unfinishedWorkoutToSave = {
      routine,
      id: startedWorkout.id,
    };
    setUnfinishedWorkout(unfinishedWorkoutToSave);
    window.localStorage.setItem("workoutAppUnfinishedWorkout", JSON.stringify(unfinishedWorkoutToSave));
    navigate("new_workout");
  };

  return (
    <div>
      <h1>
        {routine.name}
      </h1>
      <h2>Exercises</h2>
      <ul>
        {routine.exercises.map((exercise) => (
          <li key={exercise.exercise.id}>
            {exercise.exercise.name}
            ,
            {" "}
            {exercise.repRange}
            {" "}
            reps
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
        : <button type="button" onClick={startNewWorkout}>Start new workout from this routine</button>}
    </div>
  );
};

export default SingleRoutine;
