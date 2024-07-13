import {
  Table, TableHead, TableBody, TableRow, TableCell,
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
    <div>
      <h2>
        {exerciseName}
        {" "}
        (dropsets)
      </h2>
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
        <li>
          Amount of sets per dropset:
          {" "}
          {amountOfDropSets}
        </li>
      </ul>
      <Notification message={notification} />
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
                  <button type="button" onClick={() => deleteSet(set)}>delete</button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <form onSubmit={addDropSet} name={exerciseId}>
        Add a set:
        <br />
        {dropSets.map((dropSetNumber) => (
          <div key={dropSetNumber}>
            drop set
            {" "}
            {dropSetNumber + 1}
            {" "}
            of set:
            <br />
            reps:
            {" "}
            <input type="number" name={`reps${dropSetNumber}`} />
            <br />
            weight:
            {" "}
            <input type="number" name={`weight${dropSetNumber}`} step="any" />
            <br />
          </div>
        ))}
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
};

export default DropSets;
