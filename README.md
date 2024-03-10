# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

| date   | hours | description |
| ----   | ----- | ----------- |
|9.3.2024| 3     | Got started on the frontend using React. Implemented basic routing for the frontend with React Router. Tried and failed to get json-server working with the many-to-many relationship between different workout plans and exercises. |
|9.3.2024| 1.5   | Started the backend using Express and configured Mongoose. Was a bit rusty on backend develompent so a lot of time was spent on reading the Mongoose and Express docs. |
|10.3.2024| 2.5  | To the backend: Added the functionality for adding exercises and workouts. To the frontend: made a workout creator and an exercise library. Will probably switch to using some combination of Redux and React Query or RTK Query. |
|10.3.2024|1.5|Decided against switching to Redux or React Query due to the app being too simple to substantially benefit from either. Changed the term for workout routines from "workouts" to "routines", since "workouts" will probably be used to store actual instances of workouts. To the backend: made a schema for sets and started on data validation.