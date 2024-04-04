# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

|date|hours|description|
|----|-----|-----------|
|9.3.2024|3|Got started on the frontend using React. Implemented basic routing for the frontend with React Router. Tried and failed to get json-server working with the many-to-many relationship between different workout plans and exercises.|
|9.3.2024|1.5|Started the backend using Express and configured Mongoose. Was a bit rusty on backend develompent so a lot of time was spent on reading the Mongoose and Express docs.|
|10.3.2024|2.5|To the backend: Added the functionality for adding exercises and workouts. To the frontend: made a workout creator and an exercise library. Will probably switch to using some combination of Redux and React Query or RTK Query.|
|10.3.2024|1.5|Decided against switching to Redux or React Query due to the app being too simple to substantially benefit from either. Changed the term for workout routines from "workouts" to "routines", since "workouts" will probably be used to store actual instances of workouts. To the backend: made a schema for sets and started on data validation.
|13.3.2024|2.5|Worked exclusively on the backend. Created a schema and a model for workouts and struggled with the many-to-one relationship between sets and workouts. Decided on each set storing the id of the workout and exercise it is associated with, which makes storing data simpler but returning a workout populated with sets for the correct exercises a lot harder.|
|14.3.2024|1.5|On the backend: Solved the problem of returning a workout populated with sets. On the frontend: tried React Router's actions and Forms but ultimately decided against using them. Did some more rerouting and lifting state up.
|16.3.2024|1|On the backend: Implemented a feature to save multiple sets at once. On the frontend: implemented saving workouts and sets to the database through the backend.
|17.3.2024|2|Worked mainly on the frontend. On the frontend: Implemented some quality of life features like data validation for sets, notifications and redirecting after completing a workout. Worked on a feature to view past workouts. On the backend: changed the way exercises are populated to workouts.|
|17.3.2024|1.5|Worked exclusively on the frontend. Worked on saving unfinished workouts to window.localStorage and using React contexts to manage the global state of an unfinished workout.|
|19.3.2024|1.5|Worked exclusively on the frontend. Continued with working on saving unfinished workouts. Implemented a feature where unfinished workouts expire after a certain time (decided on 10 hours, but maybe in the future there will be a setting to set the expire time manually). If the application is loaded and it detects that there is an expired unfinished workout in the localStorage, it deletes it.|
|26.3.2024|1|Worked almost exclusively on the backend. Started work on user administration and login functionality.|
|27.3.2024|1.5|Worked exclusively on the backend. Worked more on the authorization and login functionality. Read a lot of docs and Stack Overflow posts and thought about best practices, so not a lot of code was written. Authorization in the backend is somewhat finished now.|
|28.3.2024|1|Worked exclusively on the backend. Added user ids to routines and exercises. Added some functionality to, for example, filter the returned routines based on the user that's associated with the authorization token submitted with the request.|
|1.4.2024|1|Worked exclusively on the backend. Added user ids to workouts and sets. Added the same functionality to sets and workouts to that last time got added to routines and exercises.|
|2.4.2024|1|Worked almost exclusively on the frontend. Started on implementing login functionality to the frontend.|
|4.4.2024|1.5|Worked exclusively on the frontend. Finished login functionality and user management on the frontend. Also did some refactoring, for example lifting the Notification component up to the Root and using React contexts to manage the notification.|