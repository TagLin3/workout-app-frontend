import {
  Link,
  useLoaderData,
} from "react-router-dom";
import routineService from "../services/routineService";

const Routines = () => {
  const routines = useLoaderData();
  return (
    <div>
      <h1>Workout routines</h1>
      {routines.map((workout) => (
        <div key={workout.name}>
          <Link to={`/routines/${workout.id}`}>{workout.name}</Link>
        </div>
      ))}
      <h2>Create new workout routine</h2>
      <Link to="/routine_creator">Routine creator</Link>
    </div>
  );
};

export const loader = () => routineService.getAll();

export default Routines;
