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

  const addSet = async (setToAdd) => {
    const addedSet = await setService.addSet({ ...setToAdd, workout: unfinishedWorkout.id });
    setSets(sets.concat(addedSet));
    window.localStorage.setItem("workoutAppUnfinishedWorkoutSets", JSON.stringify(sets.concat(addedSet)));
  };

  const addDropSets = async (setsToAdd) => {
    const savedSets = await Promise.all(setsToAdd.map(
      async (setToAdd) => setService.addSet({ ...setToAdd, workout: unfinishedWorkout.id }),
    ));
    setSets(sets.concat(savedSets));
    window.localStorage.setItem("workoutAppUnfinishedWorkoutSets", JSON.stringify(sets.concat(savedSets)));
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

  const editSet = async (editedSet) => {
    await setService.updateSet(editedSet.id, editedSet);
    const setsAfterEdit = sets.map((set) => (set.id === editedSet.id ? editedSet : set));
    setSets(setsAfterEdit);
    window.localStorage.setItem("workoutAppUnfinishedWorkoutSets", JSON.stringify(setsAfterEdit));
  };

  return (
    <Box>
      <Typography variant="h1">{name}</Typography>
      <Box>
        {exercises.map((exercise) => {
          if (exercise.type === "dropset") {
            return (
              <DropSets
                key={exercise.exercise.id}
                exerciseId={exercise.exercise.id}
                exerciseName={exercise.exercise.name}
                repRange={exercise.repRange}
                amountOfSets={exercise.amountOfSets}
                amountOfDropSets={exercise.amountOfDropSets}
                sets={sets}
                addDropSets={addDropSets}
                deleteSet={deleteSet}
              />
            );
          }
          return (
            <Sets
              key={exercise.exercise.id}
              exerciseId={exercise.exercise.id}
              exerciseName={exercise.exercise.name}
              repRange={exercise.repRange}
              amountOfSets={exercise.amountOfSets}
              amountOfDropSets={exercise.amountOfDropSets}
              sets={sets}
              addSet={addSet}
              deleteSet={deleteSet}
              editSet={editSet}
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
