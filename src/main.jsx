import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./routes/Nav";
import Routines from "./routes/Routines";
import NewWorkout from "./routes/NewWorkout";
import RoutineCreator from "./routes/RoutineCreator";
import ExerciseLibrary from "./routes/ExerciseLibrary";
import Home from "./routes/Home";

import SingleRoutine from "./routes/SingleRoutine";
import routineService from "./services/routineService";
import exerciseService from "./services/exerciseService";
import PastWorkouts from "./routes/PastWorkouts";
import workoutService from "./services/workoutService";
import SinglePastWorkout from "./routes/SinglePastWorkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav />,
    errorElement: "Error: 404 Not found",
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/routines",
        element: <Routines />,
        loader: () => routineService.getAll(),
      },
      {
        path: "/routines/:id",
        element: <SingleRoutine />,
        loader: ({ params }) => routineService.getSingle(params.id),
      },
      {
        path: "/routines/:id/new_workout",
        element: <NewWorkout />,
        loader: async ({ params }) => {
          const unfinishedWorkoutInStorage = JSON.parse(
            window.localStorage.getItem("workoutAppUnfinishedWorkout"),
          );
          const objToReturn = {
            routine: await routineService.getSingle(params.id),
            sets: JSON.parse(window.localStorage.getItem("workoutAppUnfinishedWorkoutSets")),
          };
          if (Date.now() > unfinishedWorkoutInStorage.expirationDate) {
            objToReturn.expired = true;
          }
          return (objToReturn);
        },
      },
      {
        path: "/routine_creator",
        element: <RoutineCreator />,
        loader: () => exerciseService.getAll(),
      },
      {
        path: "/exercise_library",
        element: <ExerciseLibrary />,
        loader: () => exerciseService.getAll(),
      },
      {
        path: "/past_workouts",
        element: <PastWorkouts />,
        loader: () => workoutService.getAll(),
      },
      {
        path: "/past_workouts/:id",
        element: <SinglePastWorkout />,
        loader: ({ params }) => workoutService.getSingle(params.id, true, true),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
