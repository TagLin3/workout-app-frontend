import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import exerciseService from "../services/exerciseService";
import workoutService from "../services/workoutService";
import Notification from "../components/Notification";

const WorkoutCreator = () => {
  const availableExercises = useLoaderData();
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [notification, setNotification] = useState(null);

  const addExercise = (event) => {
    event.preventDefault();
    const exerciseToAdd = JSON.parse(event.target.exercise.value);
    if (selectedExercises.some((exercise) => exerciseToAdd.id === exercise.id)) {
      setNotification("error: you can only include the same exercise once");
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } else {
      setSelectedExercises(selectedExercises.concat(
        exerciseToAdd,
      ));
    }
  };

  const createWorkout = (event) => {
    event.preventDefault();
    workoutService.addWorkout({
      name: event.target.name.value,
      exercises: selectedExercises.map((exercise) => exercise.id),
    });
  };

  return (
    <div>
      <Notification message={notification} />
      <h1>Workout creator</h1>
      <h2>Exercises</h2>
      <ol>
        {selectedExercises.map((exercise) => (
          <li key={exercise.id}>{exercise.name}</li>
        ))}
      </ol>
      <h2>Add exercise</h2>
      <form onSubmit={addExercise}>
        <select name="exercise">
          {availableExercises.map((exercise) => (
            <option
              value={`{"id": "${exercise.id}", "name": "${exercise.name}"}`}
              key={exercise.id}
            >
              {exercise.name}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">add</button>
      </form>
      <form onSubmit={createWorkout}>
        name your workout:
        {" "}
        <input name="name" />
        <br />
        <button type="submit">create workout</button>
      </form>
    </div>
  );
};

export const loader = () => exerciseService.getAll();

export default WorkoutCreator;
