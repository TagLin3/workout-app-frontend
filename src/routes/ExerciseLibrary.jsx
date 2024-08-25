import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import {
  Box, Typography, TextField, Button, Table, TableHead, TableBody, TableRow, TableCell, Dialog,
  DialogTitle, DialogContent, DialogActions, DialogContentText,
} from "@mui/material";
import exerciseService from "../services/exerciseService";

const ExerciseLibrary = () => {
  const initialExercises = useLoaderData();
  const [exerciseName, setExerciseName] = useState("");
  const [exercises, setExercises] = useState(initialExercises);
  const [exerciseToEdit, setExerciseToEdit] = useState(null);
  const [exerciseToDelete, setExerciseToDelete] = useState(null);

  const createExercise = async (event) => {
    event.preventDefault();
    const exerciseToAdd = {
      name: event.target.name.value,
    };
    const addedExercise = await exerciseService.addExercise(exerciseToAdd);
    setExercises(exercises.concat(addedExercise));
    setExerciseName("");
  };

  const editExercise = async (editedExercise) => {
    await exerciseService.editExercise(editedExercise.id, { name: editedExercise.name });
    setExercises(exercises.map(
      (exercise) => (exercise.id === editedExercise.id ? editedExercise : exercise),
    ));
    setExerciseToEdit(null);
  };

  const deleteExercise = async () => {
    await exerciseService.deleteExercise(exerciseToDelete.id);
    setExercises(exercises.filter((exercise) => exercise.id !== exerciseToDelete.id));
    setExerciseToDelete(null);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography variant="h1">Exercise library</Typography>
      <Typography variant="h2">Existing exercises</Typography>
      <Table padding="none">
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <Typography>name</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography>created by</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>Edit</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>Delete</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exercises.map((exercise) => (
            <TableRow key={exercise.id}>
              <TableCell align="left">
                {
                  exerciseToEdit && exerciseToEdit.id === exercise.id
                    ? (
                      <TextField
                        onChange={(event) => setExerciseToEdit(
                          { ...exerciseToEdit, name: event.target.value },
                        )}
                        value={exerciseToEdit.name}
                      />
                    )
                    : <Typography>{exercise.name}</Typography>
                }
              </TableCell>
              <TableCell align="left">
                <Typography>{exercise.user ? "user" : "admin"}</Typography>
              </TableCell>
              {
                exercise.user
                  ? (
                    <>
                      <TableCell align="center">
                        {
                          exerciseToEdit && exerciseToEdit.id === exercise.id
                            ? <Button onClick={() => editExercise(exerciseToEdit)}>save</Button>
                            : <Button onClick={() => setExerciseToEdit(exercise)}>edit</Button>
                        }
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={() => setExerciseToDelete(exercise)}
                      >
                        <Button>delete</Button>
                      </TableCell>
                    </>
                  )
                  : (
                    <>
                      <TableCell align="center">
                        <Typography>-</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>-</Typography>
                      </TableCell>
                    </>
                  )
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
      <Dialog
        open={Boolean(exerciseToDelete)}
        onClose={() => setExerciseToDelete(null)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Delete exercise?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" color="#FF1111">
            This will cause all of your routines that use this exercise, all of the workouts
            based on those routines, as well as all of the sets using this exercise to be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExerciseToDelete(null)}>Cancel</Button>
          <Button onClick={deleteExercise}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExerciseLibrary;
