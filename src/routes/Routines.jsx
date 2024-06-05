import {
  Link,
  useLoaderData,
} from "react-router-dom";

const Routines = () => {
  const routines = useLoaderData();

  return (
    <div>
      <h1>Workout routines</h1>
      {routines.map((routine) => (
        <div key={routine.id}>
          <Link to={`${routine.id}`}>{routine.name}</Link>
        </div>
      ))}
      <h2>Create new workout routine</h2>
      <Link to="/routine_creator">Routine creator</Link>
    </div>
  );
};

export default Routines;
