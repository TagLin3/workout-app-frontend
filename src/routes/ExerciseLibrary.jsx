import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import exerciseService from "../services/exerciseService";

const ExerciseLibrary = () => {
  const initialExercises = useLoaderData();
  const [exerciseName, setExerciseName] = useState("");
  const [exercises, setExercises] = useState(initialExercises);

  const createExercise = async (event) => {
    event.preventDefault();
    const exerciseToAdd = {
      name: event.target.name.value,
    };
    const addedExercise = await exerciseService.addExercise(exerciseToAdd);
    setExercises(exercises.concat(addedExercise));
    setExerciseName("");
  };

  return (
    <div>
      <h1>Exercise library</h1>
      <h2>Existing exercises</h2>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>{exercise.name}</li>
        ))}
      </ul>
      <h2>Create a new custom exercise</h2>
      <form onSubmit={createExercise}>
        name:
        {" "}
        <input
          value={exerciseName}
          onChange={({ target }) => setExerciseName(target.value)}
          name="name"
        />
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default ExerciseLibrary;
