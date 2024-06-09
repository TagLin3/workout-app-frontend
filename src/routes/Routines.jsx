import { useState } from "react";
import {
  Link,
  useLoaderData,
} from "react-router-dom";

const Routines = () => {
  const routines = useLoaderData();
  const activeRoutines = routines.filter((routine) => routine.active);
  const inactiveRoutines = routines.filter((routine) => !routine.active);
  const [showActive, setShowactive] = useState(true);
  const [showInactive, setShowInactive] = useState(false);
  return (
    <div>
      <h1>Workout routines</h1>
      <div>
        view:
        <br />
        active
        <input
          type="checkbox"
          checked={showActive}
          onChange={(event) => setShowactive(event.target.checked)}
        />
        <br />
        inactive
        <input
          type="checkbox"
          checked={showInactive}
          onChange={(event) => setShowInactive(event.target.checked)}
        />
      </div>
      <div>
        {showActive && (activeRoutines.length === 0
          ? <p>no active routines found</p>
          : activeRoutines.map((routine) => (
            <div key={routine.id}>
              <Link to={`${routine.id}`}>{routine.name}</Link>
            </div>
          )))}
        {showInactive && (inactiveRoutines.length === 0
          ? <p>no inactive routines found</p>
          : inactiveRoutines.map((routine) => (
            <div key={routine.id}>
              <Link to={`${routine.id}`}>{routine.name}</Link>
            </div>
          )))}
      </div>
      <h2>Create new workout routine</h2>
      <Link to="/routine_creator">Routine creator</Link>
    </div>
  );
};

export default Routines;
