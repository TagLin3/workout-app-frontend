import { useState } from "react";
import {
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
      {showActive && (activeRoutines.length === 0
        ? <Typography>no active routines found</Typography>
        : (
          <>
            <Typography variant="h3">Active routines: </Typography>
            <Box sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              flexWrap: "wrap",
            }}
            >
              {(
                activeRoutines.map((routine) => (
                  <RoutineCard key={routine.id} routine={routine} />
                ))
              )}
            </Box>
          </>
        )
      )}
      {showInactive && (inactiveRoutines.length === 0
        ? <Typography>no inactive routines found</Typography>
        : (
          <>
            <Typography variant="h3">Inactive routines: </Typography>
            <Box sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              flexWrap: "wrap",
            }}
            >
              {(
                inactiveRoutines.map((routine) => (
                  <RoutineCard key={routine.id} routine={routine} />
                ))
              )}
            </Box>
          </>
        ))}
      <Typography variant="h2">Create new workout routine:</Typography>
      <Button variant="contained" href="/routine_creator">Routine creator</Button>
    </Box>
  );
};

export default Routines;
