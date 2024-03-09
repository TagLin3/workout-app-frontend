import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Exercise from "../components/Exercise";
import exerciseService from "../services/exerciseService";
import workoutService from "../services/workoutService";

const Exercises = () => {
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
          <Exercise
            key={exercise}
            exercise={exercise}
            sets={sets}
            handleAddNewSet={handleAddNewSet}
          />
        ))}
      </div>
    </div>
  );
};

export const loader = async ({ params }) => {
  const workout = await workoutService.getSingle(params.id);
  return {
    ...workout,
  };
};

export default Exercises;
