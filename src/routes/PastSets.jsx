import { useLoaderData } from "react-router-dom";

const PastSets = () => {
  const sets = useLoaderData();
  const usedExercises = sets.map((set) => set.exercise);
  const uniqueExericses = [...new Set(sets.map((set) => set.exercise.id))];
  const exercises = uniqueExericses
    .map((exerciseId) => usedExercises
      .find((exercise) => exercise.id === exerciseId));
  const applyFilter = () => {
    console.log("filtering");
  };
  return (
    <div>
      <h1>sets</h1>
      <h3>filter by exercise</h3>
      <select onChange={applyFilter}>
        {exercises.map((exercise) => (
          <option value={exercise.id} key={exercise.id}>
            {exercise.name}
          </option>
        ))}
      </select>
      <table>
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Reps</th>
            <th>Weight</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sets
            .toSorted((a, b) => new Date(b.date) - new Date(a.date))
            .map((set) => (
              <tr key={set.id}>
                <td>{set.exercise.name}</td>
                <td>{set.reps}</td>
                <td>{set.weight}</td>
                <td>{set.date}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PastSets;
