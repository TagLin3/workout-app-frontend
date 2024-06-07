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
|4.4.2024|1.5|Worked exclusively on the frontend. Finished login functionality and user management on the frontend. Also did some refactoring like, for example, lifting the Notification component up to the Root and using React contexts to manage the notification.|
|7.4.2024|1.5|On the frontend: implemented registration functionality and some minor changes related to being logged in. On the backend: Started implementing automated tests using Jest and Supertest.|
|10.4.2024|1|Worked exclusively on the backend. Continued on adding tests using Jest and Supertest.|
|14.4.2024|1|Worked exclusively on the backend. Worked on tests. Realized that currently the application doesn't even check that the user associated with the authorization token exists in the database so that's gotta be fixed. Shouldn't be hard but logging in in the tests and adding the initial data to the database is proving to be quite difficult. For example, in order to be able to add initial routines to the db, it needs to already have users and exercises in it. Perhaps I'll have to implement some helper functions for adding initial data.
|16.4.2024|1|Realized that if the client is in posession of a valid token, then they can be trusted so no further checks need to be conducted on every subsequent request. Started adding the afformentioned helper functions for the tests which proved to be difficult task. Left in an unfinished state, the tests aren't passing right now and there is some debugging code there.|
|19.4.2024|1|Still working on testing the backend. Found another problem with it. Up until now there has been a system in place, where there are "anonymous exercises" which aren't associated with a user and "user exercises" which are associated with a user. A single user can access all of the anonymous exercises in the database but only the user exercises that are associated with that specific user. The problem is that until now anyone has been able to add anonymous exercises through the backend's API (but not the frontend) which means that a malicous user could spam useless exercises filling the db. This will need to be fixed and tests for this will probably be hell to implement.|
|24.4.2024|1|Ok idk what I was on about last time but the anonymous exercise-problem is just not a thing. You can't do a POST request to /api/exercises without a valid token, which means that you literally can not add an anonymous exercise through the backend api. Implemented more tests for the exercises route.|
|25.4.2024|1|Implemented more tests for adding and retrieving routines.|
|27.4.2024|1|Finished tests for routines route, started implementing tests for workouts route.|
|5.5.2024|1|Implementing these tests is annoying and I dislike it passionately.|
|8.5.2024|1|I'm starting to think that this is not how you're supposed to implement tests. Like something has gone terribly wrong This is like more lines of code than the entire rest of the backend and the frontend combined.|
|16.5.2024|1.5|Finally starting to seem like I might be done with the testing soon. Continued implementing tests for the sets route.|
|21.5.2024|1|Finished the tests for sets. Ran a coverage test and spotted some holes. Mainly the login route and the error handling middleware were poorly covered. Started implementing some tests for those.|
|29.5.2024|1|Tests for the backend routes are finally done. E2E-tests and React component tests will have to wait as I wish to work on some new features for now. Up to now, the routines have only stored a list of exercises, but now I want them to also store a suggested rep range for each exercise. This turns out to be a bit harder than expected since the same exercise can be used in different routines with different rep ranges. Mongoose subdocuments seem to be the way to go so I read the docs on those. Actually storing the rep range isn't trivial either. I found a Stack Overflow thread about storing ranges in Mongoose: https://stackoverflow.com/questions/43066794/how-to-represent-range-in-mongoose-schema. Will probably implement it like this.
|4.6.2024|1|Finished the model for storing rep ranges in "exercise instances". In the end, decided on just storing the rep range as a string and validating it using regular expressions. If I for some reason need to do any math with the rep ranges then I can just extract the numbers from the string using regular expressions. Populating the exercises now that they're in a subdocument turns out to be quite hard, I'll have to work on that.
|5.6.2024|1|Populating the subdocument turned out to be quite easy, actually. Fixed the tests that broke due to the change. Started working on the frontend again to implement handling the rep ranges. Some parts of the frontend seem to be broken in weird ways, at least the new workout page. I remember everything working fine before I started working on the backend so the changes to the backend are probably causing this in some convoluted way (or it was always broken and my memory is failing me).|
|5.6.2024|1|Apparently I never even finished implementing the ability to save a workout (???). I thought that the application was completely working before I started working on the backend tests. I decided to change my original approach to saving the workouts anyways so I guess it's fine. Whereas before I was only creating the workout after it was completed and then after that creating and saving the sets, now I'm creating and saving an empty workout when the workout is started and then creating and saving sets to it as they are completed. This does require some modifications to the application, but it's not too much.
|6.6.2024|1|It was a bit of a struggle with a wide variety of somewhat complicated problems that there isn't space to discuss here, but the creation and saving of workouts is working (I think). React Routers useNavigate ended up saving me due to the control flow between onClick handlers on Link components and the loader of the new workout page turned being kind of funky. Anyways the next thing to do is probably to get the sets working.|
|7.6.2024|1|The sets are now working. Did some refactoring work as well for the logic of handling the unfinished workouts. The code is cleaner now. Removed the expiring of unfinished workouts. Started implementing the ability to remove routines. Encountered the problem of the workouts referencing the routines. Deleting a routine probably shouldn't also delete a bunch of workouts. Solved it by implementing a feature to set routines as inactive, so that they don't show up with the active routines. This way inactive routines don't have to be deleted. If somebody still wants to delete a routine, they will have to first delete the workouts completed based on that routine.|