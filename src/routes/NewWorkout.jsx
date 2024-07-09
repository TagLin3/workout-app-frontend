import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Sets from "../components/Sets";
import DropSets from "../components/DropSets";
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
      return;
    }
    const number = sets.filter(
      (set) => set.exercise === exerciseId,
    ).length === 0
      ? 1
      : sets[sets.length - 1].number + 1;
    const setToSave = {
      type: "regular",
      exercise: exerciseId,
      workout: unfinishedWorkout.id,
      number,
      reps,
      weight,
      rest,
      note,
    };
    const addedSet = await setService.addSet(setToSave);
    setSets(sets.concat(addedSet));
    window.localStorage.setItem("workoutAppUnfinishedWorkoutSets", JSON.stringify(sets.concat(addedSet)));
    event.target.reps.value = "";
    event.target.weight.value = "";
    event.target.rest.value = "";
    event.target.note.value = "";
  };

  const addDropSet = async (event) => {
    event.preventDefault();
    const rest = Number(event.target.rest.value);
    const note = event.target.note.value;
    const exerciseId = event.target.name;
    const amountOfDropSets = 3;
    const lastSetsNumber = sets.filter(
      (set) => set.exercise === exerciseId,
    ).length === 0
      ? 1
      : sets[sets.length - 1].number + 1;
    const numbers = Array.from({ length: amountOfDropSets }, (_, i) => i);
    const reps = [];
    const weight = [];
    numbers.forEach((number) => {
      reps.push(Number(event.target[`reps${number}`].value));
      event.target[`reps${number}`].value = "";
      weight.push(Number(event.target[`weight${number}`].value));
      event.target[`weight${number}`].value = "";
    });
    if (
      reps.some(
        (repsForCurrentDropSet) => repsForCurrentDropSet <= 0
        || !(Number.isInteger(repsForCurrentDropSet)),
      )
      || weight.some((weightForCurrentDropSet) => weightForCurrentDropSet < 0)
      || rest < 0) {
      setNotificationForSet({ ...notificationForSet, [exerciseId]: "Reps should be above zero and an integer and weight and rest should be non-negative." });
      setTimeout(() => {
        setNotificationForSet({ ...notificationForSet, [exerciseId]: null });
      }, 3000);
      return;
    }
    const savedSets = await Promise.all(numbers.map(async (number) => {
      const setToSave = {
        type: "dropset",
        exercise: exerciseId,
        workout: unfinishedWorkout.id,
        number: number + lastSetsNumber,
        reps: reps[number],
        weight: weight[number],
        rest: number === amountOfDropSets - 1 ? rest : 0,
        note,
      };
      return setService.addSet(setToSave);
    }));
    setSets(sets.concat(savedSets));
    window.localStorage.setItem("workoutAppUnfinishedWorkoutSets", JSON.stringify(sets.concat(savedSets)));
    event.target.rest.value = "";
    event.target.note.value = "";
  };

  const workoutDone = async () => {
    window.localStorage.removeItem("workoutAppUnfinishedWorkoutSets");
    window.localStorage.removeItem("workoutAppUnfinishedWorkout");
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

  const deleteSet = async (setToDelete) => {
    await setService.deleteSet(setToDelete.id);
    const setsAfterDeletion = sets.filter((set) => set.id !== setToDelete.id);
    setSets(setsAfterDeletion);
    window.localStorage.setItem("workoutAppUnfinishedWorkoutSets", JSON.stringify(setsAfterDeletion));
  };

  return (
    <div>
      <h1>{name}</h1>
      <div>
        {exercises.map((exercise) => {
          if (exercise.type === "dropset") {
            return (
              <DropSets
                notification={notificationForSet[exercise.exercise.id]}
                key={exercise.exercise.id}
                exerciseId={exercise.exercise.id}
                exerciseName={exercise.exercise.name}
                repRange={exercise.repRange}
                amountOfSets={exercise.amountOfSets}
                amountOfDropSets={exercise.amountOfDropSets}
                sets={sets}
                addDropSet={addDropSet}
                deleteSet={deleteSet}
              />
            );
          }
          return (
            <Sets
              notification={notificationForSet[exercise.exercise.id]}
              key={exercise.exercise.id}
              exerciseId={exercise.exercise.id}
              exerciseName={exercise.exercise.name}
              repRange={exercise.repRange}
              amountOfSets={exercise.amountOfSets}
              sets={sets}
              addSet={addSet}
              deleteSet={deleteSet}
            />
          );
        })}
      </div>
      <button type="button" onClick={workoutDone}>Workout done</button>
      <button type="button" onClick={deleteWorkout}>Delete workout</button>
    </div>
  );
};

export default NewWorkout;
