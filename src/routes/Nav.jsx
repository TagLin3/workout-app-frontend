import { Link, Outlet } from "react-router-dom";

const Root = () => (
  <div>
    <nav>
      <Link to="/">home</Link>
      {" "}
      <Link to="/routines">Workout routines</Link>
      {" "}
      <Link to="/exercise_library">Exercise library</Link>
    </nav>
    <Outlet />
  </div>
);

export default Root;
