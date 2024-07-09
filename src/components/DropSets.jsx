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
  const dropSets = Array.from({ length: amountOfDropSets }, (_, i) => i);
  return (
    <div>
      <h2>
        {exerciseName}
        {" "}
        (dropsets)
      </h2>
      <h3>
        Suggested rep range:
        {" "}
        {repRange}
      </h3>
      <h3>
        Suggested amount of sets:
        {" "}
        {amountOfSets}
      </h3>
      <h3>
        Amount of sets per dropset:
        {" "}
        {amountOfDropSets}
      </h3>
      <Notification message={notification} />
      <table>
        <thead>
          <tr>
            <th>Set</th>
            <th>Reps</th>
            <th>Weight</th>
            <th>Rest after set</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {sets.filter((set) => set.exercise === exerciseId)
            .map((set) => (
              <tr key={set.number}>
                <td>{set.number}</td>
                <td>{set.reps}</td>
                <td>{set.weight}</td>
                <td>{set.rest}</td>
                <td>{set.note}</td>
                <td>
                  <button type="button" onClick={() => deleteSet(set)}>delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
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
