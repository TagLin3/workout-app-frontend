import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import routineService from "../services/routineService";
import Notification from "../components/Notification";
import ExerciseAdder from "../components/ExerciseAdder";

const RoutineCreator = () => {
  const availableExercises = useLoaderData();
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const addExercise = (event) => {
    event.preventDefault();
    const exerciseToAdd = JSON.parse(event.target.exercise.value);
    const repRangeMin = Number(event.target.repRangeMin.value);
    const repRangeMax = Number(event.target.repRangeMax.value);
    const amountOfSets = Number(event.target.amountOfSets.value);
    const type = event.target.type.value;
    if (selectedExercises.some((exercise) => exerciseToAdd.id === exercise.exercise.id)) {
      setNotification("error: you can only include the same exercise once");
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } else if (!(repRangeMin < repRangeMax)) {
      setNotification("error: invalid rep range");
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } else if (!amountOfSets) {
      setNotification("error: amount of sets is required");
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } else {
      setSelectedExercises(selectedExercises.concat({
        exercise: exerciseToAdd,
        repRange: `${repRangeMin}-${repRangeMax}`,
        amountOfSets,
        type,
      }));
    }
  };

  const createRoutine = async (event) => {
    event.preventDefault();
    await routineService.addRoutine({
      name: event.target.name.value,
      exercises: selectedExercises.map((exercise) => ({
        exercise: exercise.exercise.id,
        repRange: exercise.repRange,
        amountOfSets: exercise.amountOfSets,
        type: exercise.type,
      })),
    });
    navigate("/routines");
  };

  return (
    <div>
      <Notification message={notification} />
      <h1>Workout routine creator</h1>
      <h2>Exercises</h2>
      <ol>
        {selectedExercises.map((exercise) => (
          <li key={exercise.exercise.id}>
            {exercise.exercise.name}
            ,
            {" "}
            {exercise.repRange}
            {" "}
            reps
          </li>
        ))}
      </ol>
      <ExerciseAdder
        availableExercises={availableExercises}
        addExercise={addExercise}
      />
      <form onSubmit={createRoutine}>
        name your workout routine:
        {" "}
        <input type="text" name="name" />
        <br />
        <button type="submit">create workout routine</button>
      </form>
    </div>
  );
};

export default RoutineCreator;
