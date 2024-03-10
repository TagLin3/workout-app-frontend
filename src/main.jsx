import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Workouts,
{ loader as workoutsLoader } from "./routes/Workouts";
import ExercisesAndSetsForWorkout,
{ loader as exercisesForWorkoutLoader } from "./routes/ExercisesAndSetsForWorkout";
import WorkoutCreator,
{ loader as availableExercisesLoader } from "./routes/WorkoutCreator";
import ExerciseLibrary,
{ loader as exerciseLibraryLoader } from "./routes/ExerciseLibrary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: "Error: 404 Not found",
    children: [
      {
        path: "/workouts",
        element: <Workouts />,
        loader: workoutsLoader,
      },
      {
        path: "/workouts/:id",
        element: <ExercisesAndSetsForWorkout />,
        loader: exercisesForWorkoutLoader,
      },
      {
        path: "/workout_creator",
        element: <WorkoutCreator />,
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
