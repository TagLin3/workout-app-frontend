import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  Table, TableHead, TableBody, TableRow, TableCell, Box, Typography,
  Button,
} from "@mui/material";
import workoutService from "../services/workoutService";
import { UnfinishedWorkoutContext } from "../contexts";

const SinglePastWorkout = () => {
  const { workout, routine } = useLoaderData();
  const { unfinishedWorkout, setUnfinishedWorkout } = useContext(UnfinishedWorkoutContext);
  const navigate = useNavigate();
  const date = new Date(workout.date);

  const deleteWorkout = async () => {
    await workoutService.deleteWorkout(workout.id);
    window.localStorage.removeItem("workoutAppUnfinishedWorkoutSets");
    window.localStorage.removeItem("workoutAppUnfinishedWorkout");
    setUnfinishedWorkout(null);
    navigate("/past_workouts");
  };

  return (
    <Box>
      <Typography variant="h1">
        {`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${routine.name}`}
        {(unfinishedWorkout && unfinishedWorkout.id === workout.id) && " (unfinished)"}
      </Typography>
      <Box>
        {workout.routine.exercises.map((exercise) => (
          <Box key={exercise.exercise.id}>
            <Typography variant="h2">{exercise.exercise.name}</Typography>
            <Typography variant="h3">sets: </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>reps</TableCell>
                  <TableCell>weight</TableCell>
                  <TableCell>rest after set</TableCell>
                  <TableCell>note</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workout.sets.filter((set) => set.exercise === exercise.exercise.id)
                  .toSorted((a, b) => {
                    if (a.number !== b.number) {
                      return a.number - b.number;
                    }
                    return a.dropSetNumber - b.dropSetNumber;
                  })
                  .map((set) => (
                    <TableRow key={set.id}>
                      <TableCell>
                        {set.reps}
                      </TableCell>
                      <TableCell>
                        {set.weight}
                      </TableCell>
                      <TableCell>
                        {`${set.rest} seconds`}
                      </TableCell>
                      <TableCell>
                        {set.note}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        ))}
      </Box>
      <Button variant="contained" type="button" onClick={deleteWorkout}>delete</Button>
    </Box>
  );
};

export default SinglePastWorkout;
