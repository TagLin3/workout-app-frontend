import { useContext } from "react";
import { useLoaderData, Link } from "react-router-dom";
import {
  Table, TableHead, TableBody, TableRow, TableCell, Box, Typography,
  Button,
} from "@mui/material";
import { UnfinishedWorkoutContext } from "../contexts";

const PastWorkouts = () => {
  const workouts = useLoaderData()
    .toSorted((a, b) => (new Date(b.date) - new Date(a.date)));
  const { unfinishedWorkout } = useContext(UnfinishedWorkoutContext);
  return (
    <Box>
      <Typography variant="h1">Past workouts</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Routine
            </TableCell>
            <TableCell>
              Date
            </TableCell>
            <TableCell>
              status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workouts.map((workout) => {
            const date = new Date(workout.date);
            return (
              <TableRow key={workout.id}>
                <TableCell>
                  {workout.routine.name}
                </TableCell>
                <TableCell>
                  {`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}
                </TableCell>
                <TableCell>
                  <Button component={Link} to={workout.id}>
                    view workout
                  </Button>
                </TableCell>
                <TableCell>
                  {unfinishedWorkout && workout.id === unfinishedWorkout.id ? "unfinished" : "finished"}
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
