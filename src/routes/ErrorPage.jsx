import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  if (error.message && error.message === "Request failed with status code 401") {
    return (
      <div>
        Error: You need to be
        {" "}
        <Link to="/login">logged in</Link>
        {" "}
        to access this page
      </div>
    );
  }
  if (error.data && error.data.startsWith("Error: No route matches URL")) {
    return (
      <div>
        Error 404 not found
      </div>
    );
  }
  return (
    <div>
      some unknown error occured:
      {" "}
      {error.message}
    </div>
  );
};

export default ErrorPage;
