import { useLoaderData } from "react-router-dom";
import { useState } from "react";

const PastSets = () => {
  const { sets } = useLoaderData();
  const [filteredSets, setFilteredSets] = useState(sets);
  const usedExercises = sets.map((set) => set.exercise);
  const uniqueExericses = [...new Set(sets.map((set) => set.exercise.id))];
  const exercises = uniqueExericses
    .map((exerciseId) => usedExercises
      .find((exercise) => exercise.id === exerciseId));
  const applyFilter = async (event) => {
    const filter = event.target.value;
    setFilteredSets(sets.filter((set) => filter === "" || set.exercise.id === filter));
  };
  const setsToShow = filteredSets.slice(1, sets.length).reduce((acc, set) => {
    const lastIndex = acc.length > 0
      ? acc.length - 1 : 0;
    const lastIndexOfLastIndex = acc.length && acc[lastIndex].length > 0
      ? acc[lastIndex].length - 1 : 0;
    if (set.exercise.id !== acc[lastIndex][lastIndexOfLastIndex].exercise.id
      || set.workout !== acc[lastIndex][lastIndexOfLastIndex].workout) {
      return [...acc, [set]];
    }
    return [...acc.slice(0, -1), acc[lastIndex].concat(set)];
  }, [[filteredSets[0]]]);
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
          setsToShow
            .toSorted((a, b) => new Date(b[0].date) - new Date(a[0].date))
            .map((setGroup) => (
              <tbody key={setGroup[0].id}>
                {setGroup
                  .toSorted((a, b) => a.number - b.number)
                  .map((set) => {
                    const date = new Date(set.date);
                    const currentSetVolume = set.weight * set.reps;
                    const highestVolume = !(setGroup.some((setToCompare) => {
                      const setToCompareVolume = setToCompare.weight * setToCompare.reps;
                      if (setToCompareVolume > currentSetVolume) {
                        return true;
                      }
                      return false;
                    }));
                    return (
                      highestVolume
                        ? (
                          <tr key={set.id}>
                            <td><b>{set.exercise.name}</b></td>
                            <td><b>{set.reps}</b></td>
                            <td><b>{set.weight}</b></td>
                            <td><b>{`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}</b></td>
                          </tr>
                        )
                        : (
                          <tr key={set.id}>
                            <td>{set.exercise.name}</td>
                            <td>{set.reps}</td>
                            <td>{set.weight}</td>
                            <td>{`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}</td>
                          </tr>
                        )
                    );
                  })}
                <tr><td style={{ paddingTop: ".5rem" }} /></tr>
              </tbody>
            ))
        }
      </table>
    </div>
  );
};

export default PastSets;
