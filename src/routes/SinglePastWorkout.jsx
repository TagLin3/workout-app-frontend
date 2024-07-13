import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  Table, TableHead, TableBody, TableRow, TableCell,
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
    <div>
      <h1>
        {`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${routine.name}`}
        {(unfinishedWorkout && unfinishedWorkout.id === workout.id) && " (unfinished)"}
      </h1>
      <div>
        {workout.routine.exercises.map((exercise) => (
          <div key={exercise.exercise.id}>
            <h2>{exercise.exercise.name}</h2>
            <h3>sets: </h3>
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
          </div>
        ))}
      </div>
      <button type="button" onClick={deleteWorkout}>delete</button>
    </div>
  );
};

export default SinglePastWorkout;
