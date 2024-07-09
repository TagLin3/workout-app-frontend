import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext } from "react";
import workoutService from "../services/workoutService";
import { UnfinishedWorkoutContext } from "./Root";

const SinglePastWorkout = () => {
  const { workout, routine } = useLoaderData();
  const { unfinishedWorkout, setUnfinishedWorkout } = useContext(UnfinishedWorkoutContext);
  const navigate = useNavigate();
  const date = new Date(workout.date);

  const deleteWorkout = async () => {
    await workoutService.deleteWorkout(workout.id);
    window.localStorage.removeItem("workoutAppUnfinishedWorkoutSets");
    window.localStorage.removeItem("workoutAppUnfinishedWorkout");
    setUnfinishedWorkout(null);
    navigate("/past_workouts");
  };

  return (
    <div>
      <h1>
        {`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${routine.name}`}
        {(unfinishedWorkout && unfinishedWorkout.id === workout.id) && " (unfinished)"}
      </h1>
      <div>
        {workout.routine.exercises.map((exercise) => (
          <div key={exercise.exercise.id}>
            <h2>{exercise.exercise.name}</h2>
            <h3>sets: </h3>
            <table>
              <thead>
                <tr>
                  <th>reps</th>
                  <th>weight</th>
                  <th>rest after set</th>
                  <th>note</th>
                </tr>
              </thead>
              <tbody>
                {workout.sets.filter((set) => set.exercise === exercise.exercise.id)
                  .toSorted((set1, set2) => set1.number - set2.number)
                  .map((set) => (
                    <tr key={set.id}>
                      <td>
                        {set.reps}
                      </td>
                      <td>
                        {set.weight}
                      </td>
                      <td>
                        {`${set.rest} seconds`}
                      </td>
                      <td>
                        {set.note}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <button type="button" onClick={deleteWorkout}>delete</button>
    </div>
  );
};

export default SinglePastWorkout;
