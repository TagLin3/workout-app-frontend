const Exercise = ({ exercise, sets, handleAddNewSet }) => (
  <div>
    <h2>{exercise}</h2>
    <table>
      <thead>
        <tr>
          <th>Set</th>
          <th>Reps</th>
          <th>Weight</th>
          <th>Rest after set</th>
        </tr>
      </thead>
      <tbody>
        {sets.filter((set) => set.exercise === exercise)
          .map((set) => (
            <tr key={set.number}>
              <td>{set.number}</td>
              <td>{set.reps}</td>
              <td>{set.weight}</td>
              <td>{set.rest}</td>
            </tr>
          ))}
      </tbody>
    </table>
    <form onSubmit={handleAddNewSet} name={exercise}>
      Add a set:
      <br />
      reps:
      {" "}
      <input type="number" name="reps" />
      <br />
      weight:
      {" "}
      <input type="number" name="weight" />
      <br />
      rest after set in seconds:
      {" "}
      <input type="number" name="rest" />
      <br />
      <button type="submit">add set</button>
    </form>
  </div>
);

export default Exercise;
