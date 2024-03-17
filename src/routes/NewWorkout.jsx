import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import Sets from "../components/Sets";
import workoutService from "../services/workoutService";
import setService from "../services/setService";

const NewWorkout = () => {
  const { exercises, name, id: routineId } = useLoaderData();
  const [notification, setNotification] = useState(exercises.reduce(
    (accumulator, currentValue) => ({ ...accumulator, [currentValue.id]: null }),
    {},
  ));
  const [sets, setSets] = useState([]);
  const navigate = useNavigate();

  const addSet = (event) => {
    event.preventDefault();
    const reps = Number(event.target.reps.value);
    const weight = Number(event.target.weight.value);
    const rest = Number(event.target.rest.value);
    const note = event.target.note.value;
    const exercise = event.target.name;
    if (reps <= 0 || !(Number.isInteger(reps)) || weight < 0 || rest < 0) {
      setNotification({ ...notification, [exercise]: "Reps should be above zero and an integer and weight and rest should be non-negative." });
      setTimeout(() => {
        setNotification({ ...notification, [exercise]: null });
      }, 3000);
    } else {
      const setNumber = sets.filter(
        (set) => set.exercise === exercise,
      ).length === 0
        ? 1
        : sets[sets.length - 1].number + 1;
      setSets(sets.concat({
        exercise,
        number: setNumber,
        reps,
        weight,
        rest,
        note,
      }));
      event.target.reps.value = "";
      event.target.weight.value = "";
      event.target.rest.value = "";
      event.target.note.value = "";
    }
  };

  const workoutDone = async () => {
    const workout = {
      routine: routineId,
    };
    const savedWorkout = await workoutService.addWorkout(workout);
    setService.addMultipleSets(sets.map((set) => ({
      ...set,
      workout: savedWorkout.id,
    })));
    navigate("/routines", { state: { workoutDone: true } });
  };

  return (
    <div>
      <h1>{name}</h1>
      <div>
        {exercises.map((exercise) => (
          <Sets
            notification={notification[exercise.id]}
            key={exercise.id}
            exerciseId={exercise.id}
            exerciseName={exercise.name}
            sets={sets}
            addSet={addSet}
          />
        ))}
      </div>
      <button type="button" onClick={workoutDone}>Workout done</button>
    </div>
  );
};

export default NewWorkout;
