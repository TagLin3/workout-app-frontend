import { useContext } from "react";
import { useLoaderData, Link } from "react-router-dom";
import {
  Table, TableHead, TableBody, TableRow, TableCell, Box, Typography, Button,
} from "@mui/material";
import { UnfinishedWorkoutContext } from "../contexts";

const PastWorkouts = () => {
  const workouts = useLoaderData()
    .toSorted((a, b) => (new Date(b.date) - new Date(a.date)));
  const { unfinishedWorkout } = useContext(UnfinishedWorkoutContext);
  return (
    <Box>
      <Typography variant="h1">Past workouts</Typography>
      <Table padding="none">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>Routine</Typography>
            </TableCell>
            <TableCell>
              <Typography>Date</Typography>
            </TableCell>
            <TableCell>
              <Typography>Status</Typography>
            </TableCell>
            <TableCell>
              <Typography>View Workout</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workouts.map((workout) => {
            const date = new Date(workout.date);
            return (
              <TableRow key={workout.id}>
                <TableCell>
                  <Typography>{workout.routine.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {unfinishedWorkout && workout.id === unfinishedWorkout.id ? "unfinished" : "finished"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button component={Link} to={workout.id}>
                    view workout
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default PastWorkouts;
