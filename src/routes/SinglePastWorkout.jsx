import { Link, useLoaderData } from "react-router-dom";
import { useContext } from "react";
import {
  Table, TableHead, TableBody, TableRow, TableCell, Box, Typography, Button,
} from "@mui/material";
import workoutService from "../services/workoutService";
import { UnfinishedWorkoutContext, NotificationContext } from "../contexts";
import NotePopover from "../components/NotePopover";

const SinglePastWorkout = () => {
  const { showNotification } = useContext(NotificationContext);
  const { workout, routine } = useLoaderData();
  const { unfinishedWorkout, setUnfinishedWorkout } = useContext(UnfinishedWorkoutContext);
  const date = new Date(workout.date);

  const deleteWorkout = async () => {
    await workoutService.deleteWorkout(workout.id);
    if (unfinishedWorkout && unfinishedWorkout.id === workout.id) {
      window.localStorage.removeItem("workoutAppUnfinishedWorkoutSets");
      window.localStorage.removeItem("workoutAppUnfinishedWorkout");
      setUnfinishedWorkout(null);
    }
    showNotification({
      message: "Workout deleted!",
      severity: "success",
    }, 3000);
  };

  const editWorkout = async () => {
    if (!unfinishedWorkout || unfinishedWorkout.id === workout.id) {
      const unfinishedWorkoutToSave = {
        routine,
        id: workout.id,
      };
      setUnfinishedWorkout(unfinishedWorkoutToSave);
      window.localStorage.setItem("workoutAppUnfinishedWorkout", JSON.stringify(unfinishedWorkoutToSave));
      window.localStorage.setItem("workoutAppUnfinishedWorkoutSets", JSON.stringify(workout.sets));
    } else {
      showNotification({
        message: "Error: You need to finish your unfinished workout first",
        severity: "error",
      }, 3000);
    }
  };

  return (
    <Box>
      <Typography variant="h1">
        {`${routine.name}, ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}
        {(unfinishedWorkout && unfinishedWorkout.id === workout.id) && " (unfinished)"}
      </Typography>
      <Box>
        {workout.routine.exercises.map((exercise) => (
          <Box key={exercise.exercise.id}>
            <Typography variant="h2">{exercise.exercise.name}</Typography>
            <Typography variant="h3">sets: </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="right">
                    <Typography>Reps</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography align="right">Weight</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography align="right">Rest</Typography>
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ display: { md: "table-cell", xs: "none" }, paddingLeft: "1rem" }}
                  >
                    <Typography>Note</Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ display: { md: "none", xs: "table-cell" } }}
                  >
                    <Typography>Note</Typography>
                  </TableCell>
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
                      <TableCell align="right">
                        <Typography>{set.reps}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography>{set.weight}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography>{set.rest}</Typography>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ display: { md: "table-cell", xs: "none" } }}
                      >
                        <Typography>{set.note}</Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ display: { md: "none", xs: "table-cell" } }}
                      >
                        <NotePopover noteToPopover={set.note} />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        ))}
      </Box>
      <Button
        component={Link}
        to="/past_workouts"
        variant="contained"
        onClick={deleteWorkout}
      >
        delete
      </Button>
      <Button
        component={Link}
        to={`/routines/${routine.id}/new_workout`}
        variant="contained"
        onClick={editWorkout}
      >
        edit
      </Button>
    </Box>
  );
};

export default SinglePastWorkout;
