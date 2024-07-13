import {
  Table, TableHead, TableBody, TableRow, TableCell,
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
  <div>
    <h2>{exerciseName}</h2>
    <ul>
      <li>
        Rep range:
        {" "}
        {repRange}
      </li>
      <li>
        Amount of sets:
        {" "}
        {amountOfSets}
      </li>
    </ul>
    <Notification message={notification} />
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
      Add a set:
      <br />
      reps:
      {" "}
      <input type="number" name="reps" />
      <br />
      weight:
      {" "}
      <input type="number" name="weight" step="any" />
      <br />
      rest after set in seconds:
      {" "}
      <input type="number" name="rest" />
      <br />
      note:
      <br />
      <textarea name="note" />
      <br />
      <button type="submit">add set</button>
    </form>
  </div>
);

export default Sets;
