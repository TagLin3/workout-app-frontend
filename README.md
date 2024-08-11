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
|9.6.2024|1|Worked on the feature of setting routines as inactive and active. Thought a lot about whether the inactive routines should have their own route or should I just use a lot of conditional rendering to accommodate the routine pages looking different depending on if the routine is active or not.|
|10.6.2024|1|Setting the routines as active or inactive now works. Routines can now be deleted, which also deletes all of the workouts associated with the routines, which also deletes all of the sets associated with all of the workouts. Fixed a bug related to unfinished workouts. Started work on a page to view all of the sets completed in the past. This could be used to track progress on a particular exercise instead of having to check each workout separately.|
|13.6.2024|1|Continued working on the feature to view past sets. Fiddled a lot with how the frontend should handle sending API requests with different query strings. Ended up implementing separate functions for different query strings. This might get changed again in the future though. Also had a hard time implementing the options for the filter that can be used to filter by exercise. Essentially had the problem of removing duplicate objects from an array. Did figure that out though, although the solution does seem kind of clunky.|
|14.6.2024|1|Continued working on the feature to view past sets. I want to group the sets to workouts and then to exercises inside of those workouts. I didn't even really know how to display it but I knew I wanted and object that had workout id's as keys and objects as values. Those objects would then have each exercise used in the workout as keys and arrays of the sets done on those exercises as values. It quickly got out of hand and the code in the PastSets.jsx definitely shows it. I didn't want to make any extra API calls but I'll probably have to. First I'll have to think about how it's even supposed to look though.|
|16.6.2024|1|Continued working on the feature to view past sets. Almost the whole time was spent figuring out how to map the sets to the table rows. Ended up using separate tbody elemets to separate sets done on different exercises from each other. Decided to keep the mess of a reduce function to form the object that stores the sets grouped by exercises and workouts. Changed the structure to be an object where the keys are still workout ids but the values are arrays of sets grouped by exerice.|
|17.6.2024|1|Page for viewing past sets is starting to be complete. The sets are now sorted properly. That is, workouts are sorted by date, set groups (sets for a single exercise in a single workout) are sorted by date and sets inside a set group are sorted by set number. The new workout page now has an option for deleting sets. Changed the object containing the sets once more. It is now an array, where at each index there is an array representing a workout, inside which there are arrays representing exercises, inside which there are the set objects. This simplifies the code nicely.|
|19.6.2024|1|This was probably the least amount of lines from a session yet. Decided that the system of storing the sets in arrays of arrays of arrays(?) was just terrible. The new approach is to group the sets into "set groups" where each group contains sets that are for the same exercise AND the same workout. These groups can then be sorted by, for example, the date of the first set in the group and the sets inside these groups can be sorted by the set number. Forming these set groups turned out to be quite difficult, however. Reduce seems to be the way to go but I just can't seem to wrap my head around this sub array hell.|
|26.6.2024|1|Finally wrapped my head around the afformentioned sub array hell. The past sets page should now be done. The refactoring certainly made the JSX cleaner although the same can't necessarily be said for the reduce function that forms the array of set groups. Oh well, I can't be bothered to just grind away at it anymore trying to make it cleaner. It's now as clean as it needs to be. Also added highlighting for the top set of each set group (calculated based on set volume).|
|27.6.2024|1|Implemented tests for some features that had been added to the backend since finishing the initial implementing of tests. Added tests for deleting workouts, deleting sets, adding routines with invalid rep ranges and testing the activity and inactivity of routines.|
|3.7.2024|1|Tested using the frontend for creating some custom exercises, creating workout routines, completing workouts and viewing past sets. Added the feature to mark the suggested amount of sets for each exercise in a routine. Started adding the ability to do drop sets. Decided on adding a "type" property to the exercise instance in a routine. This type could be set to "regular" or "dropset". If it is set to drop sets, the amount of drop sets for each set will be a required property. Later might also add types like rest pause. Now will need to figure out how to store completed drop sets in the db. Will probably do this by adding a "type" to the set schema as well.|
|7.7.2024|1|Continued working on the drop sets. Decided to add each set of a drop set as an individual set but with an additional "numberInDropSet" property that identifies the ordering of drop sets that have the same "number" property (which is used for identifying the order of regular sets). Next need to implement acutally completing new drop sets which will require some complex front end logic.|
|9.7.2024|1|Continued working on the drop sets. Adding new drop sets now works. Decided to do away with the drop set numbers concept and just use regular set numbers to differentiate between drop sets. I mean if you think about it, drop sets could just be treated as regular sets but with zero rest in between. This does make storing the drop sets simpler, but it does make displaying them in a logical way harder. I think I need some unambiguous way to decipher which drop sets were completed back to back and maybe the drop set numbers would actually be useful for that. I can't really rely on everyone logging rest times, I don't even log rest times when I'm doing resistance training.
|13.7.2024|2|Finished the drop sets feature. Ended up adding the drop set numbers back to have an unambiguous way to store the order of individual sets within a drop set. Each drop set now has the same number and different drop set numbers. Finally started on styling using Material UI. A lot of time was spent reading docs and I couldn't quite figure out how to change the font globally for every default HTML component and it doesn't seem to be the way MUI is supposed to be used anyways. I'll probably have to manually change every component to use MUI components instead of the default HTML ones. Oh well, that'll be fun.
|14.7.2024|2|Changed every route and component to use only MUI components (apart from a few forms and br's, but I'll probably eventually find a solution for those). Started on a theme for the application. It's currently only changing a few headings' sizes but it will eventually do a lot more.
|19.7.2024|1|This whole styling thing is turning out to be surprisingly complicated and somewhat frustrating. Idk if I've read enough docs to say for sure that it's not just me not knowing anything about styling web apps but I think that MUI's docs are quite lacking in places. Anyways I fiddled around with all kinds of ways to add some margins to the application. For example, I wanted to add a margin to the left and right sides of the page and I started out by making a custom Div component, styling it to have margins by default and then using it in every place where I previously had used a Box component. After that I figured out that I could just wrap everything in a single Box component with some margins... These are the kind of things that are taking up most of my time right now, but I guess it's supposed to be a learning experience.|
|21.7.2024|1|Started on styling the routines page. Want to have each routine represented as a card. Decided on using flexbox to align the elements on the routines page, including the routine cards.|
|21.7.2024|1|Continued styling the routines page. The navbar was broken on smaller screens and all of the navigation buttons would have been on impossible to fit so started work on a responsive menu where the screen size dictates whether the buttons are displayed or a drop down menu is used. Also found out that the "component" prop of MUI components is quite useful when, for example, wanting to use a MUI button in place of a React Router Link component.|
|5.8.2024|1|Finished the notification menu. Changed the Notification component to use the Alert component of MUI. Started integrating different severeties of notications. Created a showNotification function that is used to show a notification for a set amount of time without having to call setTimeout with setNotification(null) every time. Some more reformatting is still required.|
|7.8.2024|2|Finished implementing the new notification system. Made a lot of progress on the styling of the application. Switched to a dark theme and changed the default colors of the application. Styled the workout routines page using flexbox. Started styling the new workout page. Really thinking primarily of the mobile interface now, which is surprisingly restrictive. Anyway, I kind of feel like I'm using flexbox in too many places right now. Like now that I've learned to use flexbox, it's a hammer and I just see everything as a nail. Oh well, it works and right now I don't really care about learning to style web apps very well. I feel like there's just too much to learn and too little time to finish the application. Regardless, flexbox works and everything is coming together decently enough.
|8.8.2024|1|Probably finished with styling the new workout page. Battled with displaying a note of a set on a mobile interface using a Popover component. Started fixing the bug where removing a set doesn't update the numbers of the sets after it. Like if you added sets 1, 2 and 3 and then removed set 1, sets 2 and 3 should become sets 1 and 2. Fixing this turned out to be quite difficult, since the sets are added to the db when they are completed and thus modifying them required modifications to the backend (adding a PUT request handler for the set route).|
|9.8.2024|1|Finished fixing the bug where the numbers of previous sets wouldn't be updated when a set is deleted. Finished styling the new workout page, adding drop sets is styled now. Styled the Exercise library page.|
|10.8.2024|1|Styled the past workouts page and the page for viewing a single past workout. Struggled with aligning the note header of the set table depending on the screen size. Apparently `align={{md: "left", xs: "middle"}}`  doesn't work so I just ended up using the classic trick of two elements with `sx={{ display: { xs: "none", md: "table-cell" } }}`.|
|11.8.2024|1|Finished styling the whole application (for now). Experimented with moving the responsibility of keeping track of unfnished workouts to the backend with maybe a "finished"-property assigned to each workout in the db but decided against it since it would be very hard to enforce having only one unfinished workout and having multiple unfinished workouts at the same time just sounds overly complicated and unnecessary. Implemented editing workouts completed in the past. Started implementing the ability to edit completed sets.|