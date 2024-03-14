import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import Sets from "../components/Sets";

const NewWorkout = () => {
  const { exercises, name } = useLoaderData();

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
      reps: reps.value,
      weight: weight.value,
      rest: rest.value,
      note: note.value,
    }));
    reps.value = "";
    weight.value = "";
    rest.value = "";
    note.value = "";
  };

  const workoutDone = () => {

  };
  return (
    <div>
      <h1>{name}</h1>
      <div>
        {exercises.map((exercise) => (
          <Sets
            key={exercise.id}
            exercise={exercise.name}
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
