import { useLoaderData } from "react-router-dom";
import Sets from "../components/Sets";
import routineService from "../services/routineService";

const ExercisesAndSetsForWorkout = () => {
  const { exercises, name } = useLoaderData();

  return (
    <div>
      <h1>{name}</h1>
      <div>
        {exercises.map((exercise) => (
          <Sets
            key={exercise.id}
            exercise={exercise.name}
          />
        ))}
      </div>
    </div>
  );
};

export const loader = ({ params }) => routineService.getSingle(params.id);

export default ExercisesAndSetsForWorkout;
