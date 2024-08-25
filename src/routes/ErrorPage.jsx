import { Link, useRouteError } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error.response);

  if (error.message && error.message === "Request failed with status code 401") {
    return (
      <Box>
        Error: You need to be
        {" "}
        <Link to="/login">logged in</Link>
        {" "}
        to access this page
      </Box>
    );
  }
  if (error.status === 404) {
    return (
      <Box>
        <Typography>
          Error 404 not found
        </Typography>
      </Box>
    );
  }
  return (
    <Box>
      <Typography>
        Some unknown error occured:
        {" "}
        {error.message}
      </Typography>
    </Box>
  );
};

export default ErrorPage;
