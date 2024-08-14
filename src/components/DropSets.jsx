import {
  Table, TableHead, TableBody, TableRow, TableCell, Box, Typography, List, ListItem, ListItemText,
  TextField, Button,
} from "@mui/material";
import { useState } from "react";
import Notification from "./Notification";
import SetEditForm from "./SetEditForm";
import NotePopover from "./NotePopover";

const DropSets = ({
  exerciseName,
  exerciseId,
  addDropSets,
  sets,
  repRange,
  deleteDropSets,
  amountOfSets,
  amountOfDropSets,
  editSet,
}) => {
  const dropSets = Array.from({ length: amountOfDropSets }, (_, i) => i + 1);
  const [notification, setNotification] = useState({ message: null });
  const showNotification = (notificationToSet, length) => {
    setNotification(notificationToSet);
    setTimeout(() => {
      setNotification({ message: null });
    }, length);
  };

  const newDropSets = async (event) => {
    event.preventDefault();
    const rest = Number(event.target.rest.value);
    const note = event.target.note.value;
    const number = sets.length === 0
      ? 1
      : sets[sets.length - 1].number + 1;
    const dropSetNumbers = Array.from({ length: amountOfDropSets }, (_, i) => i + 1);
    const reps = [];
    const weight = [];
    dropSetNumbers.forEach((dropSetNumber) => {
      reps.push(Number(event.target[`reps${dropSetNumber}`].value));
      event.target[`reps${dropSetNumber}`].value = "";
      weight.push(Number(event.target[`weight${dropSetNumber}`].value));
      event.target[`weight${dropSetNumber}`].value = "";
    });
    if (
      reps.some(
        (repsForCurrentDropSet) => repsForCurrentDropSet <= 0
        || !(Number.isInteger(repsForCurrentDropSet)),
      )
      || weight.some((weightForCurrentDropSet) => weightForCurrentDropSet < 0)
      || rest < 0) {
      showNotification({
        message: "Error: Reps should be above zero and an integer and weight and rest should be non-negative.",
        severity: "error",
      }, 3000);
      return;
    }
    const setsToSave = dropSetNumbers.map((dropSetNumber) => ({
      type: "dropset",
      exercise: exerciseId,
      number,
      dropSetNumber,
      reps: reps[dropSetNumber - 1],
      weight: weight[dropSetNumber - 1],
      rest: dropSetNumber === amountOfDropSets ? rest : 0,
      note,
    }));
    await addDropSets(setsToSave);
    event.target.rest.value = "";
    event.target.note.value = "";
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

  const initDeleteDropSets = async (setToDelete) => {
    const setsToDelete = sets.filter((set) => set.number === setToDelete.number);
    if (setToEdit && setsToDelete.some((set) => set.id === setToEdit.id)) {
      setSetToEdit(null);
    }
    const setsAfterDeletion = sets.filter((set) => set.number !== setToDelete.number);
    const updatedSets = setsAfterDeletion.map(
      (set, index) => ({ ...set, number: Math.ceil((index + 1) / amountOfDropSets) }),
    );
    deleteDropSets(setsToDelete, updatedSets);
  };

  return (
    <Box>
      <Typography variant="h2">
        {exerciseName}
        {" "}
        (dropsets)
      </Typography>
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
        <ListItem>
          <ListItemText>
            Amount of sets per dropset:
            {" "}
            {amountOfDropSets}
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
            .toSorted((a, b) => {
              if (a.number === b.number) {
                return a.dropSetNumber - b.dropSetNumber;
              }
              return a.number - b.number;
            })
            .map((set) => (
              <TableRow key={`${set.number}, ${set.dropSetNumber}`}>
                <TableCell align="right">
                  <Typography>{`${set.number}.${set.dropSetNumber}`}</Typography>
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
                  <NotePopover noteToPopover={set.note} />
                </TableCell>
                <TableCell align="center">
                  <Button
                    sx={{ padding: 0 }}
                    onClick={() => initDeleteDropSets(set)}
                  >
                    delete
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button sx={{ padding: 0 }} onClick={() => initEditSet(set)}>edit</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {setToEdit
      && (
        <SetEditForm
          finishEditingSet={finishEditingSet}
          setSetToEdit={setSetToEdit}
          setToEdit={setToEdit}
        />
      )}
      <form onSubmit={newDropSets} name={exerciseId}>
        <Typography>Add a set:</Typography>
        {dropSets.map((dropSetNumber) => (
          <Box key={dropSetNumber}>
            <Typography>
              drop set
              {" "}
              {dropSetNumber}
              {" "}
              of set:
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
            >
              <TextField sx={{ flexGrow: 1 }} label="reps" type="number" name={`reps${dropSetNumber}`} />
              <TextField sx={{ flexGrow: 1 }} label="weight" type="number" name={`weight${dropSetNumber}`} step="any" />
            </Box>
          </Box>
        ))}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="stretch"
        >
          <TextField label="rest after all drop sets in seconds" type="number" name="rest" />
          <TextField label="note" name="note" multiline />
          <Button variant="contained" type="submit">add set</Button>
        </Box>
      </form>
    </Box>
  );
};

export default DropSets;
