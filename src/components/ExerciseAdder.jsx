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
        <Box
          display="flex"
          flexDirection="column"
        >
          <FormControl>
            <InputLabel>exercise</InputLabel>
            <Select
              defaultValue="select exercise"
              label="exercise"
              name="exercise"
            >
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
          <FormControl>
            <InputLabel>Type</InputLabel>
            <Select
              defaultValue="regular"
              label="Type"
              name="type"
              onChange={(event) => setType(event.target.value)}
            >
              <MenuItem value="regular">
                regular
              </MenuItem>
              <MenuItem value="dropset">
                drop set
              </MenuItem>
            </Select>
          </FormControl>
          <TextField label="Rep range lower limit" type="number" name="repRangeMin" />
          <TextField label="Rep range upper limit" type="number" name="repRangeMax" />
          <TextField label="Amount of total sets" type="number" name="amountOfSets" />
          {type === "dropset" && (
            <TextField label="Amount of sets in one drop set" type="number" name="amountOfDropSets" />
          )}
          <Button variant="contained" type="submit">add</Button>
        </Box>
      </form>
    </Box>
  );
};

export default ExerciseAdder;
