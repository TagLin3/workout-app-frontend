import { Link, Outlet } from "react-router-dom";

const Root = () => (
  <div>
    <nav>
      <Link to="/">home</Link>
      {" "}
      <Link to="/workouts">Workouts</Link>
      {" "}
      <Link to="/exercise_library">Exercise library</Link>
    </nav>
    <Outlet />
  </div>
);

export default Root;
