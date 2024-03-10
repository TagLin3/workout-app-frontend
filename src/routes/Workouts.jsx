import {
  Link,
  useLoaderData,
} from "react-router-dom";
import workoutService from "../services/workoutService";

const Workouts = () => {
  const workouts = useLoaderData();
  return (
    <div>
      <h1>Workouts</h1>
      {workouts.map((workout) => (
        <div key={workout.name}>
          <Link to={`/workouts/${workout.id}`}>{workout.name}</Link>
        </div>
      ))}
      <h2>Create new workout</h2>
      <Link to="/workout_creator">Workout creator</Link>
    </div>
  );
};

export const loader = () => workoutService.getAll();

export default Workouts;
