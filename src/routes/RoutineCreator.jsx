import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Table, TableHead, TableBody, TableRow, TableCell,
} from "@mui/material";
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
    const amountOfDropSets = type === "dropset"
      ? Number(event.target.amountOfDropSets.value)
      : undefined;
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
        amountOfDropSets,
        type,
      }));
      event.target.exercise.value = "";
      event.target.repRangeMin.value = "";
      event.target.repRangeMax.value = "";
      event.target.amountOfSets.value = "";
      event.target.type.value = "";
    }
  };

  const createRoutine = async (event) => {
    event.preventDefault();
    if (event.target.name.value === "") {
      setNotification("error: name for workout routine is required");
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } else {
      await routineService.addRoutine({
        name: event.target.name.value,
        exercises: selectedExercises.map((exercise) => ({
          exercise: exercise.exercise.id,
          repRange: exercise.repRange,
          amountOfSets: exercise.amountOfSets,
          amountOfDropSets: exercise.amountOfDropSets,
          type: exercise.type,
        })),
      });
      navigate("/routines");
      setNotification("Workout routine created!");
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  const removeExercise = (exerciseToRemoveId) => {
    setSelectedExercises(
      selectedExercises.filter((exercise) => exercise.exercise.id !== exerciseToRemoveId),
    );
  };

  return (
    <div>
      <Notification message={notification} />
      <h1>Workout routine creator</h1>
      <h2>Exercises</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Exercise</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Rep range</TableCell>
            <TableCell>Amount of sets</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedExercises.map((exercise) => (
            <TableRow key={exercise.exercise.id}>
              <TableCell>{exercise.exercise.name}</TableCell>
              <TableCell>{exercise.type}</TableCell>
              <TableCell>{exercise.repRange}</TableCell>
              <TableCell>
                {exercise.amountOfSets}
                {exercise.type === "dropset" && ` times ${exercise.amountOfDropSets} dropsets`}
              </TableCell>
              <TableCell>
                <button type="button" onClick={() => removeExercise(exercise.exercise.id)}>remove</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
