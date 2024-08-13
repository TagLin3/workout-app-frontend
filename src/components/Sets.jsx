import {
  Table, TableHead, TableBody, TableRow, TableCell, Box, Typography, List, ListItem, ListItemText,
  TextField, Button,
  Popover,
} from "@mui/material";
import { useState } from "react";
import Notification from "./Notification";
import SetEditForm from "./SetEditForm";

const Sets = ({
  exerciseName,
  exerciseId,
  addSet,
  sets,
  repRange,
  deleteSet,
  amountOfSets,
  editSet,
}) => {
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

  const [notification, setNotification] = useState({ message: null });
  const showNotification = (notificationToSet, length) => {
    setNotification(notificationToSet);
    setTimeout(() => {
      setNotification({ message: null });
    }, length);
  };

  const newSet = async (event) => {
    event.preventDefault();
    const reps = Number(event.target.reps.value);
    const weight = Number(event.target.weight.value);
    const rest = Number(event.target.rest.value);
    const note = event.target.note.value;
    if (reps <= 0 || !(Number.isInteger(reps)) || weight < 0 || rest < 0) {
      showNotification({
        message: "Error: Reps should be above zero and an integer and weight and rest should be non-negative.",
        severity: "error",
      }, 3000);
      return;
    }
    const number = sets.length === 0
      ? 1
      : sets[sets.length - 1].number + 1;
    const setToSave = {
      type: "regular",
      exercise: exerciseId,
      number,
      reps,
      weight,
      rest,
      note,
    };
    await addSet(setToSave);
    event.target.reps.value = "";
    event.target.weight.value = "";
    event.target.rest.value = "";
    event.target.note.value = "";
  };

  const initDeleteSet = async (setToDelete) => {
    const setsAfterDeletion = sets.filter((set) => set.id !== setToDelete.id);
    const updatedSets = await Promise.all(setsAfterDeletion.map(
      async (set, index) => ({ ...set, number: index + 1 }),
    ));
    deleteSet(setToDelete, updatedSets);
  };

  const [setToEdit, setSetToEdit] = useState(null);
  const initEditSet = (set) => {
    setSetToEdit(set);
  };
  const finishEditingSet = async (event) => {
    event.preventDefault();
    await editSet(setToEdit);
    setSetToEdit(null);
  };

  return (
    <Box>
      <Typography variant="h2">{exerciseName}</Typography>
      <List>
        <ListItem>
          <ListItemText>
            Rep range:
            {" "}
            {repRange}
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            Amount of sets:
            {" "}
            {amountOfSets}
          </ListItemText>
        </ListItem>
      </List>
      <Notification message={notification.message} severity={notification.severity} />
      <Table padding="none">
        <TableHead>
          <TableRow>
            <TableCell align="right">
              <Typography>Set</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>Reps</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>Weight</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>Rest</Typography>
            </TableCell>
            <TableCell
              align="left"
              sx={{ display: { md: "table-cell", xs: "none" }, paddingLeft: { md: "1rem" } }}
            >
              <Typography>Note</Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{ display: { md: "none", xs: "table-cell" } }}
            >
              <Typography>Note</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>Delete</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>Edit</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sets.filter((set) => set.exercise === exerciseId)
            .map((set) => (
              <TableRow key={set.number}>
                <TableCell align="right">
                  <Typography>{set.number}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{set.reps}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{set.weight}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{set.rest}</Typography>
                </TableCell>
                <TableCell align="left" sx={{ display: { md: "table-cell", xs: "none" }, maxWidth: "10rem", paddingLeft: "1rem" }}>
                  <Typography>{set.note}</Typography>
                </TableCell>
                <TableCell align="center" sx={{ display: { md: "none", xs: "table-cell" } }}>
                  <Button
                    sx={{ padding: 0 }}
                    onClick={(event) => noteHandleOpen(set.note, event)}
                  >
                    view
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
                <TableCell align="center">
                  <Button sx={{ padding: 0 }} onClick={() => initDeleteSet(set)}>delete</Button>
                </TableCell>
                <TableCell align="center">
                  <Button sx={{ padding: 0 }} onClick={() => initEditSet(set)}>edit</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {setToEdit && (
        <SetEditForm
          setToEdit={setToEdit}
          setSetToEdit={setSetToEdit}
          finishEditingSet={finishEditingSet}
        />
      )}
      <form onSubmit={newSet} name={exerciseId}>
        <Box
          display="flex"
          flexDirection="column"
        >
          <Typography variant="h5">Add a set:</Typography>
          <Box
            display="flex"
            flexDirection="row"
          >
            <TextField sx={{ flexGrow: 1 }} label="reps" type="number" name="reps" />
            <TextField sx={{ flexGrow: 1 }} label="weight" type="number" name="weight" step="any" />
          </Box>
          <TextField label="rest after set in seconds" type="number" name="rest" />
          <TextField label="note" name="note" multiline />
          <Button variant="contained" type="submit">add set</Button>
        </Box>
      </form>
    </Box>
  );
};

export default Sets;
