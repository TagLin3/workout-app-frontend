import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Sets from "../components/Sets";
import setService from "../services/setService";
import { NotificationContext, UnfinishedWorkoutContext } from "./Root";
import workoutService from "../services/workoutService";

const NewWorkout = () => {
  const loaderData = useLoaderData();
  const { unfinishedWorkout, setUnfinishedWorkout } = useContext(UnfinishedWorkoutContext);
  const navigate = useNavigate();
  const { setNotification } = useContext(NotificationContext);
  const [sets, setSets] = useState(
    loaderData.sets
    ?? [],
  );

  const { exercises, name } = loaderData.routine;
  const [notificationForSet, setNotificationForSet] = useState(exercises.reduce(
    (accumulator, currentValue) => ({ ...accumulator, [currentValue.exercise.id]: null }),
    {},
  ));

  const addSet = async (event) => {
    event.preventDefault();
    const reps = Number(event.target.reps.value);
    const weight = Number(event.target.weight.value);
    const rest = Number(event.target.rest.value);
    const note = event.target.note.value;
    const exerciseId = event.target.name;
    if (reps <= 0 || !(Number.isInteger(reps)) || weight < 0 || rest < 0) {
      setNotificationForSet({ ...notificationForSet, [exerciseId]: "Reps should be above zero and an integer and weight and rest should be non-negative." });
      setTimeout(() => {
        setNotificationForSet({ ...notificationForSet, [exerciseId]: null });
      }, 3000);
    } else {
      const number = sets.filter(
        (set) => set.exercise === exerciseId,
      ).length === 0
        ? 1
        : sets[sets.length - 1].number + 1;
      const newSet = {
        exercise: exerciseId,
        workout: unfinishedWorkout.id,
        number,
        reps,
        weight,
        rest,
        note,
      };
      await setService.addSet(newSet);
      setSets(sets.concat(newSet));
      window.localStorage.setItem("workoutAppUnfinishedWorkoutSets", JSON.stringify(sets.concat(newSet)));
      event.target.reps.value = "";
      event.target.weight.value = "";
      event.target.rest.value = "";
      event.target.note.value = "";
    }
  };

  const workoutDone = async () => {
    window.localStorage.removeItem("workoutAppUnfinishedWorkoutSets");
    setUnfinishedWorkout(null);
    navigate("/routines");
    setNotification("Workout saved!");
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const deleteWorkout = async () => {
    await workoutService.deleteWorkout(unfinishedWorkout.id);
    window.localStorage.removeItem("workoutAppUnfinishedWorkoutSets");
    window.localStorage.removeItem("workoutAppUnfinishedWorkout");
    setUnfinishedWorkout(null);
    navigate("/routines");
    setNotification("Workout deleted!");
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div>
      <h1>{name}</h1>
      <div>
        {exercises.map((exercise) => (
          <Sets
            notification={notificationForSet[exercise.exercise.id]}
            key={exercise.exercise.id}
            exerciseId={exercise.exercise.id}
            exerciseName={exercise.exercise.name}
            repRange={exercise.repRange}
            sets={sets}
            addSet={addSet}
          />
        ))}
      </div>
      <button type="button" onClick={workoutDone}>Workout done</button>
      <button type="button" onClick={deleteWorkout}>Delete workout</button>
    </div>
  );
};

export default NewWorkout;
