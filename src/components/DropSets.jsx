import {
  Table, TableHead, TableBody, TableRow, TableCell, Box, Typography, List, ListItem, ListItemText,
  TextField, Button, Popover,
} from "@mui/material";
import { useState } from "react";
import Notification from "./Notification";

const DropSets = ({
  exerciseName,
  exerciseId,
  addDropSet,
  sets,
  notification,
  repRange,
  deleteSet,
  amountOfSets,
  amountOfDropSets,
}) => {
  const dropSets = Array.from({ length: amountOfDropSets }, (_, i) => i + 1);
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
                  <Button sx={{ padding: 0 }}>edit</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <form onSubmit={addDropSet} name={exerciseId}>
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
