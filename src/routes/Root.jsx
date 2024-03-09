import { Link, Outlet } from "react-router-dom";

const Root = () => (
  <div>
    <nav>
      <Link to="/">Workouts</Link>
    </nav>
    <Outlet />
  </div>
);

export default Root;
