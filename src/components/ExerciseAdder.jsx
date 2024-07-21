import { useState } from "react";
import {
  Box, Typography, Select, MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Button,
} from "@mui/material";

const ExerciseAdder = ({ addExercise, availableExercises }) => {
  const [type, setType] = useState("regular");
  return (
    <Box>
      <Typography variant="h2">Add exercise</Typography>
      <form onSubmit={addExercise}>
        <FormControl>
          <InputLabel>exercise</InputLabel>
          <Select defaultValue="select exercise" label="exercise" name="exercise">
            <MenuItem value="select exercise">
              Select exercise
            </MenuItem>
            {availableExercises.map((exercise) => (
              <MenuItem
                value={`{"id": "${exercise.id}", "name": "${exercise.name}"}`}
                key={exercise.id}
              >
                {exercise.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <FormControl>
          <InputLabel>Type</InputLabel>
          <Select
            defaultValue="select type"
            label="Type"
            name="type"
            onChange={(event) => setType(event.target.value)}
          >
            <MenuItem value="select type">Select type</MenuItem>
            <MenuItem value="regular">
              regular
            </MenuItem>
            <MenuItem value="dropset">
              drop set
            </MenuItem>
          </Select>
        </FormControl>
        <br />
        <TextField label="Rep range lower limit" type="number" name="repRangeMin" />
        <br />
        <TextField label="Rep range upper limit" type="number" name="repRangeMax" />
        <br />
        <TextField label="Amount of total sets" type="number" name="amountOfSets" />
        <br />
        {type === "dropset" && (
          <>
            <TextField label="Amount of sets in one drop set" type="number" name="amountOfDropSets" />
            <br />
          </>
        )}
        <Button variant="contained" type="submit">add</Button>
      </form>
    </Box>
  );
};

export default ExerciseAdder;
