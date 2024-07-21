import { useState } from "react";
import {
  Link,
  useLoaderData,
} from "react-router-dom";
import {
  Box, Typography, Button, Checkbox, FormControlLabel,
} from "@mui/material";
import RoutineCard from "../components/RoutineCard";

const Routines = () => {
  const routines = useLoaderData();
  const activeRoutines = routines.filter((routine) => routine.active);
  const inactiveRoutines = routines.filter((routine) => !routine.active);
  const [showActive, setShowactive] = useState(true);
  const [showInactive, setShowInactive] = useState(false);
  return (
    <Box sx={{
      display: "flex", flexDirection: "column", alignItems: "center",
    }}
    >
      <Typography variant="h1">Workout routines</Typography>
      <Box>
        <Typography>view:</Typography>
        <FormControlLabel
          control={(
            <Checkbox
              checked={showActive}
              onChange={(event) => setShowactive(event.target.checked)}
            />
          )}
          label="active"
        />
        <br />
        <FormControlLabel
          control={(
            <Checkbox
              checked={showInactive}
              onChange={(event) => setShowInactive(event.target.checked)}
            />
          )}
          label="inactive"
        />
      </Box>
      <Box sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
      }}
      >
        {showActive && (activeRoutines.length === 0
          ? <Typography>no active routines found</Typography>
          : (
            activeRoutines.map((routine) => (
              <RoutineCard key={routine.id} routine={routine} />
            ))
          ))}
        {showInactive && (inactiveRoutines.length === 0
          ? <Typography>no inactive routines found</Typography>
          : inactiveRoutines.map((routine) => (
            <Box key={routine.id}>
              <Typography>
                <Link to={`${routine.id}`}>{routine.name}</Link>
              </Typography>
            </Box>
          )))}
      </Box>
      <Typography variant="h2">Create new workout routine</Typography>
      <Button variant="contained" href="/routine_creator">Routine creator</Button>
    </Box>
  );
};

export default Routines;
