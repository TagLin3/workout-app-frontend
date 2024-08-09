import {
  Table, TableHead, TableBody, TableRow, TableCell, Box, Typography, List, ListItem, ListItemText,
  TextField, Button,
} from "@mui/material";
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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Set</TableCell>
            <TableCell>Dropset in set</TableCell>
            <TableCell>Reps</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Rest after set</TableCell>
            <TableCell>Note</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sets.filter((set) => set.exercise === exerciseId)
            .map((set) => (
              <TableRow key={`${set.number}, ${set.dropSetNumber}`}>
                <TableCell>{set.number}</TableCell>
                <TableCell>{set.dropSetNumber}</TableCell>
                <TableCell>{set.reps}</TableCell>
                <TableCell>{set.weight}</TableCell>
                <TableCell>{set.rest}</TableCell>
                <TableCell>{set.note}</TableCell>
                <TableCell>
                  <Button variant="contained" type="button" onClick={() => deleteSet(set)}>delete</Button>
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
