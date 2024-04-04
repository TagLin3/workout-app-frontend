import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Sets from "../components/Sets";
import workoutService from "../services/workoutService";
import setService from "../services/setService";
import { NotificationContext, UnfinishedWorkoutContext } from "./Root";

const NewWorkout = () => {
  const loaderData = useLoaderData();
  const { setUnfinishedWorkout } = useContext(UnfinishedWorkoutContext);
  const navigate = useNavigate();
  const { setNotification } = useContext(NotificationContext);
  const [sets, setSets] = useState(
    loaderData.sets
    ?? [],
  );

  useEffect(() => {
    if (loaderData.expired) {
      setUnfinishedWorkout(null);
    }
  }, []);
  const { exercises, name, id: routineId } = loaderData.routine;
  const [notificationForSet, setNotificationForSet] = useState(exercises.reduce(
    (accumulator, currentValue) => ({ ...accumulator, [currentValue.id]: null }),
    {},
  ));

  const addSet = (event) => {
    event.preventDefault();
    const reps = Number(event.target.reps.value);
    const weight = Number(event.target.weight.value);
    const rest = Number(event.target.rest.value);
    const note = event.target.note.value;
    const exercise = event.target.name;
    if (reps <= 0 || !(Number.isInteger(reps)) || weight < 0 || rest < 0) {
      setNotificationForSet({ ...notificationForSet, [exercise]: "Reps should be above zero and an integer and weight and rest should be non-negative." });
      setTimeout(() => {
        setNotificationForSet({ ...notificationForSet, [exercise]: null });
      }, 3000);
    } else {
      const number = sets.filter(
        (set) => set.exercise === exercise,
      ).length === 0
        ? 1
        : sets[sets.length - 1].number + 1;
      setSets(sets.concat({
        exercise, number, reps, weight, rest, note,
      }));
      window.localStorage.setItem("workoutAppUnfinishedWorkoutSets", JSON.stringify(sets.concat({
        exercise, number, reps, weight, rest, note,
      })));
      event.target.reps.value = "";
      event.target.weight.value = "";
      event.target.rest.value = "";
      event.target.note.value = "";
    }
  };

  const workoutDone = async () => {
    const workout = {
      routine: routineId,
    };
    const savedWorkout = await workoutService.addWorkout(workout);
    setService.addMultipleSets(sets.map((set) => ({
      ...set,
      workout: savedWorkout.id,
    })));
    window.localStorage.removeItem("workoutAppUnfinishedWorkoutSets");
    navigate("/routines", { state: { notification: "Workout saved!" } });
  };

  const deleteWorkout = async () => {
    window.localStorage.removeItem("workoutAppUnfinishedWorkoutSets");
    window.localStorage.removeItem("workoutAppUnfinishedWorkout");
    setUnfinishedWorkout(null);
    navigate("/routines", { state: { notification: "Workout deleted!" } });
    setNotification("Workout deleted!");
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  if (loaderData.expired) {
    return (
      <div>
        error: unfinished workout not found.
        Most likely you were on the page while the unfinished workout expired.
      </div>
    );
  }
  return (
    <div>
      <h1>{name}</h1>
      <div>
        {exercises.map((exercise) => (
          <Sets
            notification={notificationForSet[exercise.id]}
            key={exercise.id}
            exerciseId={exercise.id}
            exerciseName={exercise.name}
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
