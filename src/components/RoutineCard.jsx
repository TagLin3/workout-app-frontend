import {
  Card, CardContent, List, ListItem, ListItemText, Typography,
} from "@mui/material";

const RoutineCard = ({ name, exercises }) => (
  <Card>
    <CardContent>
      <Typography variant="h3">{name}</Typography>
      <Typography variant="h4">exercises:</Typography>
      <List>
        {exercises.map((exercise) => (
          <ListItem>
            <ListItemText>
              {exercise.exercise.name}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
);

export default RoutineCard;
