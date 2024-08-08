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
            <TableCell align="center">
              <Typography>Note</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>Delete</Typography>
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
                <TableCell align="center" sx={{ display: { md: "table-cell", xs: "none" } }}>
                  <Typography>{set.note}</Typography>
                </TableCell>
                <TableCell align="center" sx={{ display: { md: "none", xs: "table-cell" } }}>
                  <Button onClick={(event) => noteHandleOpen(set.note, event)}>view note</Button>
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
                  <Button onClick={() => deleteSet(set)}>delete</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <form onSubmit={addSet} name={exerciseId}>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
        }}
        >
          <Typography variant="h5">Add a set:</Typography>
          <Box sx={{
            display: "flex",
            flexDirection: "row",
          }}
          >
            <TextField label="reps" type="number" name="reps" />
            <TextField label="weight" type="number" name="weight" step="any" />
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
