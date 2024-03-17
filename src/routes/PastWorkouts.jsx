import { useLoaderData, Link } from "react-router-dom";

const PastWorkouts = () => {
  const workouts = useLoaderData();
  return (
    <div>
      <h1>Past workouts</h1>
      <table>
        <thead>
          <tr>
            <th>
              Routine
            </th>
            <th>
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => {
            const date = new Date(workout.date);
            return (
              <tr key={workout.id}>
                <td>
                  {workout.routine.name}
                </td>
                <td>
                  {`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}
                </td>
                <td>
                  <Link to={workout.id}>
                    view workout
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PastWorkouts;
