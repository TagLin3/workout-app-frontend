import { useLoaderData } from "react-router-dom";

const SinglePastWorkout = () => {
  const workout = useLoaderData();
  const date = new Date(workout.date);
  return (
    <div>
      <h1>{`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${workout.routine.name}`}</h1>
      <div>
        {workout.routine.exercises.map((exercise) => (
          <div key={exercise.id}>
            <h2>{exercise.name}</h2>
            <h3>sets: </h3>
            <table>
              <thead>
                <tr>
                  <th>
                    reps
                  </th>
                  <th>
                    weight
                  </th>
                  <th>
                    rest after set
                  </th>
                </tr>
              </thead>
              <tbody>
                {workout.sets.filter((set) => set.exercise === exercise.id)
                  .toSorted((set1, set2) => set1.number - set2.number)
                  .map((set) => (
                    <tr key={set.id}>
                      <td>
                        {set.reps}
                      </td>
                      <td>
                        {set.weight}
                      </td>
                      <td>
                        {`${set.rest} seconds`}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SinglePastWorkout;
