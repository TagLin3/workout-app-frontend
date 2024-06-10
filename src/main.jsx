import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

import Root from "./routes/Root";
import Routines from "./routes/Routines";
import NewWorkout from "./routes/NewWorkout";
import RoutineCreator from "./routes/RoutineCreator";
import ExerciseLibrary from "./routes/ExerciseLibrary";
import Home from "./routes/Home";
import ErrorPage from "./routes/ErrorPage";
import Register from "./routes/Register";
import PastSets from "./routes/PastSets";
import SingleRoutine from "./routes/SingleRoutine";
import PastWorkouts from "./routes/PastWorkouts";
import SinglePastWorkout from "./routes/SinglePastWorkout";
import Login from "./routes/Login";

import workoutService from "./services/workoutService";
import routineService from "./services/routineService";
import exerciseService from "./services/exerciseService";
import setService from "./services/setService";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
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
        loader: async () => {
          const unfinishedWorkoutInStorage = JSON.parse(
            window.localStorage.getItem("workoutAppUnfinishedWorkout"),
          );
          return {
            ...unfinishedWorkoutInStorage,
            sets: JSON.parse(window.localStorage.getItem("workoutAppUnfinishedWorkoutSets")),
          };
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
        path: "/past_sets",
        element: <PastSets />,
        loader: () => setService.getAll(),
      },
      {
        path: "/past_workouts/:id",
        element: <SinglePastWorkout />,
        loader: ({ params }) => workoutService.getSingle(params.id, true, true),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
    loader: () => {
      const loggedUserInStorage = JSON.parse(window.localStorage.getItem("workoutAppLoggedUser"));
      if (loggedUserInStorage) {
        axios.defaults.headers.common.Authorization = `Bearer ${loggedUserInStorage.token}`;
      }
      return loggedUserInStorage;
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
