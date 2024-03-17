import { useEffect, useState } from "react";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Notification from "../components/Notification";

const Routines = () => {
  const routines = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (location.state && location.state.newWorkoutState) {
      setNotification(location.state.newWorkoutState);
      setTimeout(() => {
        setNotification(null);
        navigate(".", { replace: true });
      }, 3000);
    }
  }, []);

  return (
    <div>
      <h1>Workout routines</h1>
      <Notification message={notification} />
      {routines.map((workout) => (
        <div key={workout.name}>
          <Link to={`${workout.id}`}>{workout.name}</Link>
        </div>
      ))}
      <h2>Create new workout routine</h2>
      <Link to="/routine_creator">Routine creator</Link>
    </div>
  );
};

export default Routines;
