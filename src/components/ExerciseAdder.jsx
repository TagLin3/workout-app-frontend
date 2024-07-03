import { useState } from "react";

const ExerciseAdder = ({ addExercise, availableExercises }) => {
  const [type, setType] = useState("regular");
  return (
    <div>
      <h2>Add exercise</h2>
      <form onSubmit={addExercise}>
        exercise:
        {" "}
        <select name="exercise">
          {availableExercises.map((exercise) => (
            <option
              value={`{"id": "${exercise.id}", "name": "${exercise.name}"}`}
              key={exercise.id}
            >
              {exercise.name}
            </option>
          ))}
        </select>
        <br />
        type:
        {" "}
        <select name="type" onChange={(event) => setType(event.target.value)}>
          <option value="regular">
            regular
          </option>
          <option value="dropset">
            drop set
          </option>
        </select>
        <br />
        rep range:
        {" "}
        <input type="number" name="repRangeMin" />
        -
        <input type="number" name="repRangeMax" />
        <br />
        suggested amount of total sets:
        {" "}
        <input type="number" name="amountOfSets" />
        <br />
        {type === "dropset" && (
          <>
            amount of sets in one drop set:
            {" "}
            <input type="number" name="amountOfdropSets" />
          </>
        )}
        <br />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default ExerciseAdder;
