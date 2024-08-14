import {
  Box, Typography,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";

const UserPage = () => {
  const user = useLoaderData();
  return (
    <Box>
      <Typography variant="h2">Your information:</Typography>
    </Box>
  );
};

export default UserPage;
