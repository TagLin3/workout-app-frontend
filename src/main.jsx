import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./routes/Nav";
import Routines,
{ loader as routinesLoader } from "./routes/Routines";
import ExercisesAndSetsForWorkout,
{ loader as exercisesForWorkoutLoader } from "./routes/ExercisesAndSetsForWorkout";
import RoutineCreator,
{ loader as availableExercisesLoader } from "./routes/RoutineCreator";
import ExerciseLibrary,
{ loader as exerciseLibraryLoader } from "./routes/ExerciseLibrary";
import Home from "./routes/Home";

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
        loader: routinesLoader,
      },
      {
        path: "/routines/:id",
        element: <ExercisesAndSetsForWorkout />,
        loader: exercisesForWorkoutLoader,
      },
      {
        path: "/routine_creator",
        element: <RoutineCreator />,
        loader: availableExercisesLoader,
      },
      {
        path: "/exercise_library",
        element: <ExerciseLibrary />,
        loader: exerciseLibraryLoader,
      },
    ],
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
