import { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Table, TableHead, TableBody, TableRow, TableCell, Box, Typography, Button, TextField,
} from "@mui/material";
import routineService from "../services/routineService";
import { NotificationContext } from "../contexts";
import ExerciseAdder from "../components/ExerciseAdder";

const RoutineCreator = () => {
  const availableExercises = useLoaderData();
  const [selectedExercises, setSelectedExercises] = useState([]);
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  const addExercise = (event) => {
    event.preventDefault();
    if (event.target.exercise.value === "select exercise") {
      showNotification({
        severity: "error",
        message: "Error: An exercise needs to be selected",
      }, 3000);
      return;
    }
    const exerciseToAdd = JSON.parse(event.target.exercise.value);
    const repRangeMin = Number(event.target.repRangeMin.value);
    const repRangeMax = Number(event.target.repRangeMax.value);
    const amountOfSets = Number(event.target.amountOfSets.value);
    const type = event.target.type.value;
    const amountOfDropSets = type === "dropset"
      ? Number(event.target.amountOfDropSets.value)
      : undefined;
    if (selectedExercises.some((exercise) => exerciseToAdd.id === exercise.exercise.id)) {
      showNotification({
        severity: "error",
        message: "Error: You can only include the same exercise once",
      }, 3000);
    } else if (!(repRangeMin < repRangeMax)) {
      showNotification({
        severity: "error",
        message: "Error: Invalid rep range",
      }, 3000);
    } else if (!amountOfSets) {
      showNotification({
        severity: "error",
        message: "Error: Amount of sets is required",
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
      if (event.target.type.value === "dropset") {
        event.target.amountOfDropSets.value = "";
      }
      event.target.type.value = "";
    }
  };

  const createRoutine = async (event) => {
    event.preventDefault();
    if (event.target.name.value === "") {
      showNotification({
        severity: "error",
        message: "Error: Name for workout is required",
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
      showNotification({
        severity: "success",
        message: "Workout routine created!",
      }, 3000);
    }
  };

  const removeExercise = (exerciseToRemoveId) => {
    setSelectedExercises(
      selectedExercises.filter((exercise) => exercise.exercise.id !== exerciseToRemoveId),
    );
  };

  return (
    <Box>
      <Typography variant="h1">Workout routine creator</Typography>
      <Typography variant="h2">Exercises</Typography>
      <Table padding="none">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography>Exercise</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>Type</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>Rep range</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>Sets</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>Remove</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedExercises.map((exercise) => (
            <TableRow key={exercise.exercise.id}>
              <TableCell align="center">
                <Typography>{exercise.exercise.name}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>{exercise.type}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>{exercise.repRange}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>
                  {exercise.amountOfSets}
                  {exercise.type === "dropset" && ` times ${exercise.amountOfDropSets} dropsets`}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Button
                  onClick={() => removeExercise(exercise.exercise.id)}
                  sx={{ padding: 0 }}
                >
                  remove
                </Button>
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
        <TextField label="name your workout routine" type="text" name="name" />
        <br />
        <Button variant="contained" type="submit">create workout routine</Button>
      </form>
    </Box>
  );
};

export default RoutineCreator;
