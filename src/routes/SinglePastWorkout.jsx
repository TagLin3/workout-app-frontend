import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import {
  Table, TableHead, TableBody, TableRow, TableCell, Box, Typography,
  Button,
  Popover,
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
    if (unfinishedWorkout && unfinishedWorkout.id === workout.id) {
      window.localStorage.removeItem("workoutAppUnfinishedWorkoutSets");
      window.localStorage.removeItem("workoutAppUnfinishedWorkout");
      setUnfinishedWorkout(null);
    }
    navigate("/past_workouts");
  };

  const [noteAnchorEl, setNoteAnchorEl] = useState(null);
  const [noteContent, setNoteContent] = useState(null);
  const noteOpen = Boolean(noteAnchorEl);
  const noteHandleClose = () => {
    setNoteAnchorEl(null);
  };
  const noteHandleOpen = (note, event) => {
    setNoteContent(note);
    setNoteAnchorEl(event.target);
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
                        <Button onClick={(event) => noteHandleOpen(set.note, event)}>
                          view note
                        </Button>
                        <Popover
                          open={noteOpen}
                          anchorEl={noteAnchorEl}
                          onClose={noteHandleClose}
                        >
                          <Typography>
                            {noteContent}
                          </Typography>
                        </Popover>
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
