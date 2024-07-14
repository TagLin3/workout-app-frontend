import { Link, useRouteError } from "react-router-dom";
import { Box } from "@mui/material";

const ErrorPage = () => {
  const error = useRouteError();
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
  if (error.data && error.data.startsWith("Error: No route matches URL")) {
    return (
      <Box>
        Error 404 not found
      </Box>
    );
  }
  return (
    <Box>
      some unknown error occured:
      {" "}
      {error.message}
    </Box>
  );
};

export default ErrorPage;
