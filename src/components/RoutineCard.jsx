import {
  Card, CardActionArea, CardContent, List, ListItem, ListItemText, Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const RoutineCard = ({ routine }) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        flexBasis: 400,
        marginY: 1,
        borderRadius: 3,
        border: 3,
        backgroundColor: "primary.main",
        color: "#000000",
      }}
      variant="outlined"
    >
      <CardContent>
        <CardActionArea onClick={() => navigate(`/routines/${routine.id}`)}>
          <Typography variant="h3">{routine.name}</Typography>
          <Typography variant="h4">exercises:</Typography>
          <List>
            {routine.exercises.map((exercise) => {
              const secondaryText = exercise.type === "dropset"
                ? `${exercise.repRange} reps, ${exercise.amountOfSets} dropsets with ${exercise.amountOfDropSets} sets each`
                : `${exercise.repRange} reps, ${exercise.amountOfSets} sets`;
              return (
                <ListItem key={exercise.exercise.id}>
                  <ListItemText
                    secondary={secondaryText}
                    secondaryTypographyProps={{
                      color: "#404040",
                    }}
                    primaryTypographyProps={{
                      color: "#000000",
                    }}
                  >
                    {exercise.exercise.name}
                  </ListItemText>
                </ListItem>
              );
            })}
          </List>
        </CardActionArea>
      </CardContent>
    </Card>
  );
};

export default RoutineCard;
