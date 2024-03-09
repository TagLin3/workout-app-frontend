import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Workouts, { loader as workoutsLoader } from "./routes/Workouts";
import Root from "./routes/Root";
import Exercises, { loader as exercisesLoader } from "./routes/Exercises";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: "Error: 404 Not found",
    children: [
      {
        path: "/",
        element: <Workouts />,
        loader: workoutsLoader,
      },
      {
        path: "workouts/:id",
        element: <Exercises />,
        loader: exercisesLoader,
      },
    ],
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
