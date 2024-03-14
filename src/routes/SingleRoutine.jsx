import { Link, useLoaderData } from "react-router-dom";

const SingleRoutine = () => {
  const routine = useLoaderData();
  return (
    <div>
      <h1>
        {routine.name}
      </h1>
      <h2>Exercises</h2>
      <ul>
        {routine.exercises.map((exercise) => (
          <li key={exercise.id}>
            {exercise.name}
          </li>
        ))}
      </ul>
      <Link to="new">Start new workout from this routine</Link>
    </div>
  );
};

export default SingleRoutine;
