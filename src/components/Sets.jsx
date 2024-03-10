import { useState } from "react";

const Sets = ({ exercise }) => {
  const [sets, setSets] = useState([]);

  const onSubmit = (event) => {
    event.preventDefault();
    const {
      name, reps, weight, rest,
    } = event.target;
    const setNumber = sets.filter(
      (set) => set.exercise === name,
    ).length === 0
      ? 1
      : sets[sets.length - 1].number + 1;
    setSets(sets.concat({
      exercise: name,
      number: setNumber,
      reps: reps.value,
      weight: weight.value,
      rest: rest.value,
    }));
    reps.value = "";
    weight.value = "";
    rest.value = "";
  };

  return (
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
      <form onSubmit={onSubmit} name={exercise}>
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
        note:
        <br />
        <textarea name="note" />
        <br />
        <button type="submit">add set</button>
      </form>
    </div>
  );
};

export default Sets;
