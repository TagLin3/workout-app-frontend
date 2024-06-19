import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import setService from "../services/setService";

const PastSets = () => {
  const { sets, workouts } = useLoaderData();
  const usedExercises = sets.map((set) => set.exercise);
  const uniqueExericses = [...new Set(sets.map((set) => set.exercise.id))];
  const exercises = uniqueExericses
    .map((exerciseId) => usedExercises
      .find((exercise) => exercise.id === exerciseId));
  // const setsGroupedByExercisesGroupedByWorkouts = workouts
  //   .toSorted((b, a) => new Date(a.date) - new Date(b.date))
  //   .map((workout) => {
  //     const setsForCurrentWorkout = sets.filter((set) => set.workout === workout.id);
  //     const exercisesOfCurrentWorkout = [...new Set(setsForCurrentWorkout
  //       .map((set) => set.exercise.id))];
  //     return exercisesOfCurrentWorkout.map((exerciseId) => (
  //       setsForCurrentWorkout.filter((set) => set.exercise.id === exerciseId)));
  //   });
  // const [setsToShow, setSetsToShow] = useState(setsGroupedByExercisesGroupedByWorkouts);
  // const applyFilter = (event) => {
  //   const filter = event.target.value;
  //   setSetsToShow(setsGroupedByExercisesGroupedByWorkouts
  //     .map((setsForWorkout) => setsForWorkout
  //       .filter((setsForExercise) => (filter !== "" ? setsForExercise[0].exercise.id === filter : true))));
  // };
  const applyFilter = async () => {
    console.log("asdf");
  };
  // const deleteSet = (setToDeleteId) => {
  //   // setService.deleteSet(setToDeleteId);
  //   console.log(setsToShow
  //     .map((setsForWorkout) => setsForWorkout
  //       .map((setsForExercise) => setsForExercise
  //         .filter((set) => set.id === setToDeleteId))));
  //   // setSetsToShow(setsToShow
  //   //   .map((setsForWorkout) => setsForWorkout
  //   //     .map((setsForExercise) => setsForExercise
  //   //       .filter((set) => set.id === setToDeleteId))));
  // };
  const setsToShow = sets.slice(1).reduce((acc, set) => {
    console.log(acc);
    const exerciseOfCurrentSetGroup = acc[acc.length - 1][0].exercise;
    if (set.exercise.id !== exerciseOfCurrentSetGroup.id) {
      console.log("zxcv");
      return [...acc, [set]];
    }
    console.log(acc[acc.length - 1]);
    return acc[acc.length - 1].concat(set);
  }, [[sets[0]]]);
  console.log(setsToShow);
  return (
    <div>
      <h1>sets</h1>
      <h3>filter by exercise</h3>
      <select onChange={applyFilter}>
        <option value="">
          all exercises
        </option>
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
          // setsToShow.map((setGroupsForWorkout) => (
          //   setGroupsForWorkout
          //     .toSorted((a, b) => new Date(b[0].date) - new Date(a[0].date))
          //     .map((setsForSingleExercise) => (
          //       <tbody key={setsForSingleExercise[0].id}>
          //         {setsForSingleExercise
          //           .toSorted((a, b) => a.number - b.number)
          //           .map((set) => {
          //             const date = new Date(set.date);
          //             return (
          //               <tr key={set.id}>
          //                 <td>{set.exercise.name}</td>
          //                 <td>{set.reps}</td>
          //                 <td>{set.weight}</td>
          //                 <td>{`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}</td>
          //                 <td>
          //                   <button type="button" onClick={() => deleteSet(set.id)}>delete</button>
          //                 </td>
          //               </tr>
          //             );
          //           })}
          //         <tr><td style={{ paddingBottom: ".5rem" }} /></tr>
          //       </tbody>
          //     ))
          // ))
        }
        <tbody>
          {
            sets
              .toSorted((a, b) => new Date(b.date) - new Date(a.date))
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
              })
          }
        </tbody>
      </table>
    </div>
  );
};

export default PastSets;
