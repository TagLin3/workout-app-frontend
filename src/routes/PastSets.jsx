import { useLoaderData } from "react-router-dom";

const PastSets = () => {
  const sets = useLoaderData();
  const usedExercises = sets.map((set) => set.exercise);
  const uniqueExericses = [...new Set(sets.map((set) => set.exercise.id))];
  const exercises = uniqueExericses
    .map((exerciseId) => usedExercises
      .find((exercise) => exercise.id === exerciseId));
  const workouts = [...new Set(sets.map((set) => set.workout))];
  const setsGroupedByExercisesGroupedByWorkouts = workouts.reduce((acc, workout) => {
    const setsForCurrentWorkout = sets.filter((set) => set.workout === workout);
    const exercisesOfCurrentWorkout = [...new Set(setsForCurrentWorkout
      .map((set) => set.exercise.id))];
    return {
      ...acc,
      [workout]: exercisesOfCurrentWorkout
        .map((exerciseId) => (
          setsForCurrentWorkout.filter((set) => set.exercise.id === exerciseId))),
    };
  }, {});
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
        {
          Object.keys(setsGroupedByExercisesGroupedByWorkouts).map((workout) => (
            setsGroupedByExercisesGroupedByWorkouts[workout]
              .map((setsForSingleExercise) => (
                <tbody key={`${workout};${setsForSingleExercise[0].exercise.id}`}>
                  {setsForSingleExercise
                    .toSorted((a, b) => a.number - b.number)
                    .map((set) => {
                      const date = new Date(set.date);
                      return (
                        <tr key={set.id}>
                          <td>{set.exercise.name}</td>
                          <td>{set.reps}</td>
                          <td>{set.weight}</td>
                          <td>{`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}</td>
                        </tr>
                      );
                    })}
                  <tr><td style={{ paddingBottom: ".5rem" }} /></tr>
                </tbody>
              ))
          ))
        }
      </table>
    </div>
  );
};

export default PastSets;
