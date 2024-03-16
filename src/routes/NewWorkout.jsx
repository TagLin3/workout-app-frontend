import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import Sets from "../components/Sets";
import workoutService from "../services/workoutService";
import setService from "../services/setService";

const NewWorkout = () => {
  const { exercises, name, id: routineId } = useLoaderData();

  const [sets, setSets] = useState([]);

  const addSet = (event) => {
    event.preventDefault();
    const {
      reps, weight, rest, note,
    } = event.target;
    const exercise = event.target.name;
    const setNumber = sets.filter(
      (set) => set.exercise === exercise,
    ).length === 0
      ? 1
      : sets[sets.length - 1].number + 1;
    setSets(sets.concat({
      exercise,
      number: setNumber,
      reps: Number(reps.value),
      weight: Number(weight.value),
      rest: Number(rest.value),
      note: note.value,
    }));
    reps.value = "";
    weight.value = "";
    rest.value = "";
    note.value = "";
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
  };

  return (
    <div>
      <h1>{name}</h1>
      <div>
        {exercises.map((exercise) => (
          <Sets
            key={exercise.id}
            exerciseId={exercise.id}
            exerciseName={exercise.name}
            sets={sets}
            addSet={addSet}
          />
        ))}
      </div>
      <button type="button" onClick={workoutDone}>Workout done</button>
    </div>
  );
};

export default NewWorkout;
