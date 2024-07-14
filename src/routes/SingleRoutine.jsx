import { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import {
  Box, List, ListItem, ListItemText, Typography, Button,
} from "@mui/material";
import { UnfinishedWorkoutContext, NotificationContext } from "../contexts";
import workoutService from "../services/workoutService";
import routineService from "../services/routineService";

const SingleRoutine = () => {
  const { unfinishedWorkout, setUnfinishedWorkout } = useContext(UnfinishedWorkoutContext);
  const routine = useLoaderData();
  const [active, setActive] = useState(routine.active);
  const { setNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  const deleteUnfinisedWorkout = () => {
    window.localStorage.removeItem("workoutAppUnfinishedWorkoutSets");
    window.localStorage.removeItem("workoutAppUnfinishedWorkout");
    setUnfinishedWorkout(null);
    setNotification("Workout deleted!");
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const startNewWorkout = async () => {
    const startedWorkout = await workoutService.addWorkout({ routine: routine.id });
    const unfinishedWorkoutToSave = {
      routine,
      id: startedWorkout.id,
    };
    setUnfinishedWorkout(unfinishedWorkoutToSave);
    window.localStorage.setItem("workoutAppUnfinishedWorkout", JSON.stringify(unfinishedWorkoutToSave));
    navigate("new_workout");
  };

  const toggleActivity = async () => {
    if (unfinishedWorkout) {
      setNotification("error: you need to finish the uncompleted workout first");
      setTimeout(() => setNotification(null), 3000);
    } else {
      await routineService.toggleActivity(routine.id);
      setActive(!active);
    }
  };

  const deleteRoutine = async () => {
    await routineService.deleteRoutine(routine.id);
    window.confirm("Warning: this will delete all of the workouts associated with this routine and also all of the sets associated with those workouts.");
    setNotification("Routine deleted!");
    setTimeout(() => setNotification(null), 3000);
    navigate("/routines");
  };

  return (
    <Box>
      <Typography variant="h1">
        {routine.name}
        {!active && " (inactive)"}
      </Typography>
      <Typography variant="h2">Exercises</Typography>
      <List>
        {routine.exercises.map((exercise) => (
          <ListItem key={exercise.exercise.id}>
            <ListItemText>
              {exercise.exercise.name}
              ,
              {" "}
              {exercise.repRange}
              {" "}
              reps
            </ListItemText>
          </ListItem>
        ))}
      </List>
      {active
        ? (unfinishedWorkout
          ? (
            <Box>
              <Typography>
                You currently have an unfinished workout of the routine &quot;
                {unfinishedWorkout.routine.name}
                &quot;. You can&apos;t start a new workout until you&apos;ve finished the old one.
              </Typography>
              <br />
              <Typography>
                You can
                {" "}
                <Link to={`/routines/${unfinishedWorkout.routine.id}/new_workout`}>continue the workout</Link>
                {" "}
                or
                {" "}
                <Link
                  to="/routines"
                  state={{ newWorkoutState: "Workout deleted!" }}
                  onClick={deleteUnfinisedWorkout}
                >
                  delete it
                </Link>
              </Typography>
            </Box>
          )
          : (
            <Button
              variant="contained"
              type="button"
              onClick={startNewWorkout}
            >
              Start new workout from this routine
            </Button>
          ))
        : <Typography>you can only start a workout from an active routine</Typography>}
      <br />
      <Box>
        {active ? (
          <Typography>
            This routine is currently active meaning that you
            are actively completing workouts based on it. Set this
            routine as inactive in order to make it possible to delete it.
          </Typography>
        )
          : (
            <Typography>
              This routine is currently inactive meaning that you are no longer actively
              completing workouts based on it. You will have to set this routine as
              active to complete workouts on it again.
            </Typography>
          )}
        <Button variant="contained" type="button" onClick={toggleActivity}>
          Set this routine as
          {active ? " inactive" : " active"}
        </Button>
      </Box>
      {!active && (
        <Box>
          <Button variant="contained" type="button" onClick={deleteRoutine}>delete</Button>
        </Box>
      )}
    </Box>
  );
};

export default SingleRoutine;
