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
          <TableCell>Rest</TableCell>
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
              <TableCell sx={{ display: { md: "table-cell", xs: "none" } }}>{set.note}</TableCell>
              <TableCell sx={{ display: { md: "none", xs: "table-cell" } }}>
                <Button>view note</Button>
              </TableCell>
              <TableCell>
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

export default Sets;
