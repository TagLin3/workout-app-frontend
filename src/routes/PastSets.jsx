import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import {
  Table, TableHead, TableBody, TableRow, TableCell, Box, Typography, Select,
  MenuItem,
} from "@mui/material";

const PastSets = () => {
  const { sets } = useLoaderData();
  if (sets.length === 0) {
    return (
      <Box>
        <Typography variant="h1">sets</Typography>
        <Typography>
          No sets completed yet. Complete a workout and your completed sets will be shown here
        </Typography>
      </Box>
    );
  }
  const [filteredSets, setFilteredSets] = useState(sets);
  const usedExercises = sets.map((set) => set.exercise);
  const uniqueExericses = [...new Set(sets.map((set) => set.exercise.id))];
  const exercises = uniqueExericses
    .map((exerciseId) => usedExercises
      .find((exercise) => exercise.id === exerciseId));
  const applyFilter = async (event) => {
    const filter = event.target.value;
    setFilteredSets(sets.filter((set) => filter === "all" || set.exercise.id === filter));
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
    <Box>
      <Typography variant="h1">sets</Typography>
      <Typography variant="h3">filter by exercise</Typography>
      <Select defaultValue="all" onChange={applyFilter}>
        <MenuItem value="all">
          all exercises
        </MenuItem>
        {exercises.map((exercise) => (
          <MenuItem value={exercise.id} key={exercise.id}>
            {exercise.name}
          </MenuItem>
        ))}
      </Select>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Exercise</TableCell>
            <TableCell>Reps</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        {
          setsToShow
            .toSorted((a, b) => new Date(b[0].date) - new Date(a[0].date))
            .map((setGroup) => (
              <TableBody key={setGroup[0].id}>
                {setGroup
                  .toSorted((a, b) => {
                    if (a.number !== b.number) {
                      return a.number - b.number;
                    }
                    return a.dropSetNumber - b.dropSetNumber;
                  })
                  .map((set) => {
                    const date = new Date(set.date);
                    return (
                      <TableRow key={set.id}>
                        <TableCell>{set.exercise.name}</TableCell>
                        <TableCell>{set.reps}</TableCell>
                        <TableCell>{set.weight}</TableCell>
                        <TableCell>
                          {set.type}
                          {" "}
                          {set.type === "dropset" && `(${set.dropSetNumber})`}
                        </TableCell>
                        <TableCell>{`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            ))
        }
      </Table>
    </Box>
  );
};

export default PastSets;
