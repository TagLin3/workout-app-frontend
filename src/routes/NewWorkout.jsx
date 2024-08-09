import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import Sets from "../components/Sets";
import DropSets from "../components/DropSets";
import setService from "../services/setService";
import { NotificationContext, UnfinishedWorkoutContext } from "../contexts";
import workoutService from "../services/workoutService";

const NewWorkout = () => {
  const loaderData = useLoaderData();
  const { unfinishedWorkout, setUnfinishedWorkout } = useContext(UnfinishedWorkoutContext);
  const navigate = useNavigate();
  const { showNotification } = useContext(NotificationContext);
  const [sets, setSets] = useState(
    loaderData.sets
    ?? [],
  );

  const { exercises, name } = loaderData.routine;
  const [notificationForSet, setNotificationForSet] = useState(exercises.reduce(
    (accumulator, currentValue) => (
      { ...accumulator, [currentValue.exercise.id]: { message: null } }),
    {},
  ));

  const showNotificationForSet = (notificationToSet, exerciseId, length) => {
    setNotificationForSet({ ...notificationForSet, [exerciseId]: notificationToSet });
    setTimeout(() => {
      setNotificationForSet({ ...notificationForSet, [exerciseId]: { message: null } });
    }, length);
  };

  const addSet = async (event) => {
    event.preventDefault();
    const reps = Number(event.target.reps.value);
    const weight = Number(event.target.weight.value);
    const rest = Number(event.target.rest.value);
    const note = event.target.note.value;
    const exerciseId = event.target.name;
    if (reps <= 0 || !(Number.isInteger(reps)) || weight < 0 || rest < 0) {
      showNotificationForSet({
        message: "Error: Reps should be above zero and an integer and weight and rest should be non-negative.",
        severity: "error",
      }, exerciseId, 3000);
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
    const number = sets.filter(
      (set) => set.exercise === exerciseId,
    ).length === 0
      ? 1
      : sets[sets.length - 1].number + 1;
    const dropSetNumbers = Array.from({ length: amountOfDropSets }, (_, i) => i + 1);
    const reps = [];
    const weight = [];
    dropSetNumbers.forEach((dropSetNumber) => {
      reps.push(Number(event.target[`reps${dropSetNumber}`].value));
      event.target[`reps${dropSetNumber}`].value = "";
      weight.push(Number(event.target[`weight${dropSetNumber}`].value));
      event.target[`weight${dropSetNumber}`].value = "";
    });
    if (
      reps.some(
        (repsForCurrentDropSet) => repsForCurrentDropSet <= 0
        || !(Number.isInteger(repsForCurrentDropSet)),
      )
      || weight.some((weightForCurrentDropSet) => weightForCurrentDropSet < 0)
      || rest < 0) {
      showNotificationForSet({
        message: "Error: Reps should be above zero and an integer and weight and rest should be non-negative.",
        severity: "error",
      }, exerciseId, 3000);
      return;
    }
    const savedSets = await Promise.all(dropSetNumbers.map(async (dropSetNumber) => {
      const setToSave = {
        type: "dropset",
        exercise: exerciseId,
        workout: unfinishedWorkout.id,
        number,
        dropSetNumber,
        reps: reps[dropSetNumber - 1],
        weight: weight[dropSetNumber - 1],
        rest: dropSetNumber === amountOfDropSets ? rest : 0,
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
    showNotification({ severity: "success", message: "Workout saved!" }, 3000);
  };

  const deleteWorkout = async () => {
    await workoutService.deleteWorkout(unfinishedWorkout.id);
    window.localStorage.removeItem("workoutAppUnfinishedWorkoutSets");
    window.localStorage.removeItem("workoutAppUnfinishedWorkout");
    setUnfinishedWorkout(null);
    navigate("/routines");
    showNotification({ severity: "success", message: "Workout deleted!" }, 3000);
  };

  const deleteSet = async (setToDelete) => {
    await setService.deleteSet(setToDelete.id);
    const setsAfterDeletion = sets.filter((set) => set.id !== setToDelete.id);
    const setsToUpdate = setsAfterDeletion.filter(
      (set) => setToDelete.exercise === set.exercise,
    );
    const setsToNotUpdate = setsAfterDeletion.filter(
      (set) => setToDelete.exercise !== set.exercise,
    );
    const updatedSets = await Promise.all(setsToUpdate.map(async (set, index) => {
      const updatedSet = await setService.updateSet(set.id, { number: index + 1 });
      return updatedSet;
    }));
    const setsAfterUpdating = setsToNotUpdate.concat(updatedSets);
    setSets(setsAfterUpdating);
    window.localStorage.setItem("workoutAppUnfinishedWorkoutSets", JSON.stringify(setsAfterUpdating));
  };

  return (
    <Box>
      <Typography variant="h1">{name}</Typography>
      <Box>
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
      </Box>
      <Button color="success" variant="contained" type="button" onClick={workoutDone}>Workout done</Button>
      <Button color="error" variant="contained" type="button" onClick={deleteWorkout}>Delete workout</Button>
    </Box>
  );
};

export default NewWorkout;
