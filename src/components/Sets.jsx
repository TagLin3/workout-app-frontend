import {
  Table, TableHead, TableBody, TableRow, TableCell, Box, Typography, List, ListItem, ListItemText,
  TextField, Button,
} from "@mui/material";
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
}) => (
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
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Set</TableCell>
          <TableCell>Reps</TableCell>
          <TableCell>Weight</TableCell>
          <TableCell>Rest after set</TableCell>
          <TableCell>Note</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sets.filter((set) => set.exercise === exerciseId)
          .map((set) => (
            <TableRow key={set.number}>
              <TableCell>{set.number}</TableCell>
              <TableCell>{set.reps}</TableCell>
              <TableCell>{set.weight}</TableCell>
              <TableCell>{set.rest}</TableCell>
              <TableCell>{set.note}</TableCell>
              <TableCell>
                <button type="button" onClick={() => deleteSet(set)}>delete</button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
    <form onSubmit={addSet} name={exerciseId}>
      <Typography>Add a set:</Typography>
      <TextField label="reps" type="number" name="reps" />
      <br />
      <TextField label="weight" type="number" name="weight" step="any" />
      <br />
      <TextField label="rest after set in seconds" type="number" name="rest" />
      <br />
      <TextField label="note" name="note" multiline />
      <br />
      <Button variant="contained" type="submit">add set</Button>
    </form>
  </Box>
);

export default Sets;
