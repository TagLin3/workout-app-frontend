import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import {
  Box, Typography, List, ListItem,
  ListItemText, TextField, Button,
} from "@mui/material";
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
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography variant="h1">Exercise library</Typography>
      <Typography variant="h2">Existing exercises</Typography>
      <List>
        {exercises.map((exercise) => (
          <ListItem key={exercise.id}>
            <ListItemText sx={{ textAlign: "center" }}>
              {exercise.name}
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Typography textAlign="center" variant="h2">Create a new custom exercise</Typography>
      <form onSubmit={createExercise}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <TextField
            label="name"
            value={exerciseName}
            onChange={({ target }) => setExerciseName(target.value)}
            name="name"
          />
          <Button variant="contained" type="submit">create</Button>
        </Box>
      </form>
    </Box>
  );
};

export default ExerciseLibrary;
