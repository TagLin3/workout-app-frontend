import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Sets from "../components/Sets";
import workoutService from "../services/workoutService";

const ExercisesAndSetsForWorkout = () => {
  const { exercises } = useLoaderData();
  const [sets, setSets] = useState([]);

  const handleAddNewSet = (event) => {
    event.preventDefault();
    const setNumber = sets.filter(
      (set) => set.exercise === event.target.name,
    ).length === 0
      ? 1
      : sets[sets.length - 1].number + 1;
    setSets(sets.concat({
      exercise: event.target.name,
      number: setNumber,
      reps: event.target.reps.value,
      weight: event.target.weight.value,
      rest: event.target.rest.value,
    }));
  };

  return (
    <div>
      <h1>testWorkout</h1>
      <div>
        {exercises.map((exercise) => (
          <Sets
            key={exercise.id}
            exercise={exercise.name}
            sets={sets}
            handleAddNewSet={handleAddNewSet}
          />
        ))}
      </div>
    </div>
  );
};

export const loader = ({ params }) => workoutService.getSingle(params.id);

export default ExercisesAndSetsForWorkout;
