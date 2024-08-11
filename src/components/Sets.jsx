import {
  Table, TableHead, TableBody, TableRow, TableCell, Box, Typography, List, ListItem, ListItemText,
  TextField, Button,
  Popover,
} from "@mui/material";
import { useState } from "react";
import Notification from "./Notification";

const Sets = ({
  exerciseName,
  exerciseId,
  addSet,
  sets,
  notification,
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

  const initEditSet = () => {

  };

  const finishEditingSet = () => {

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
                  <Button sx={{ padding: 0 }} onClick={() => deleteSet(set)}>delete</Button>
                </TableCell>
                <TableCell align="center">
                  <Button sx={{ padding: 0 }} onClick={() => initEditSet(set)}>edit</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Box display="none">
        <form onSubmit={finishEditingSet}>
          <Button>test</Button>
        </form>
      </Box>
      <form onSubmit={addSet} name={exerciseId}>
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
