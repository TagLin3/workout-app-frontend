import Notification from "./Notification";

const Sets = ({
  exerciseName, exerciseId, addSet, sets, notification,
}) => (
  <div>
    <h2>{exerciseName}</h2>
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
            </tr>
          ))}
      </tbody>
    </table>
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
