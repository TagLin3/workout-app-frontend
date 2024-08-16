import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { LoggedUserContext } from "../contexts";

/* eslint max-len: 0 */
const Home = () => {
  const { loggedUser } = useContext(LoggedUserContext);
  return (
    <Box>
      <Typography variant="h1">Application for planning workouts and logging them</Typography>
      {
        loggedUser
          ? (
            <>
              <Typography>
                Welcome to my workout planning and logging application! This is the home page. Here you can find instructions for using the application.
              </Typography>
              <Typography>
                At the top of the page you can see the navigation menu. It may look different depending on if you&apos;re viewing the application on a desktop or a mobile device, but the options will be the same.
              </Typography>
              <Typography variant="h3">
                Instructions for using the application:
              </Typography>
              <Typography variant="h4">
                The &quot;workout routines&quot; page:
              </Typography>
              <Typography>
                The workout routines page is where you can view workout routines created by you. A workout routine is a combination of exercises with instructions of, for example, how many reps and sets to do. For example, a workout routine could be an upped body day or a leg day. A routine can be active, meaning you are currently actively completing workouts based on the routine, or inactive, meaning you are not. You can filter the routines to see only active, only inactive or all routines. Each routine is displayed as a card, that can be clicked or tapped to view the routine. Also in the workout routines page you can access the &quot;routine creator&quot;.
              </Typography>
              <Typography variant="h4">
                The routine creator:
              </Typography>
              <Typography>
                This is where you create new workout routines. Just pick an exercise, pick whether to do regular sets or drop sets, specify a rep range and the amount of sets and add the exercise to the routine. Remember to name the workout routine after adding all the exercises you want.
              </Typography>
              <Typography variant="h4">
                Viewing a single routine:
              </Typography>
              <Typography>
                In the page to view a single routine you can see a preview of the exercises and the instructions to do them. You can set the routine as inactive or active. You can also start a new workout from it. If the routine is inactive, you can delete choose to delet it, which will delete all the workouts based on the routine as well as all of the sets based on those workouts.
              </Typography>
              <Typography variant="h4">
                Completing workouts:
              </Typography>
              <Typography>
                A workout is a single completion of a routine. In the page to complete a workout you can log your results on each exercise and they will be instantly saved as completed sets. The workout, however, will be set as unfinished until you finish it (with the button at the bottom of the page). Having an unfinished workout means having a link to it in the navigation menu as well as not being able to start a new workout, you can&apos;t have two unfinished workouts at the same time. A workout is always based on a routine. Due to this, deleting a workout routine will also delete the workouts completed based on it.
              </Typography>
              <Typography variant="h4">
                The &quot;exercise library&quot; page:
              </Typography>
              <Typography>
                This is where to view the exercises you have access to. These include the default exercises available for everyone as well as your own custom exercises. You can also create a new custom exercise. Just pick a name and click or tap create.
              </Typography>
              <Typography variant="h4">
                The &quot;past workouts&quot; page:
              </Typography>
              <Typography>
                This is where to view the workouts you have started in the past. You will see the routine the workout was based on, the date of starting the workout, whether the workout is finished or unfinished and a button to view the details of the workout.
              </Typography>
              <Typography variant="h4">
                Viewing a single workout:
              </Typography>
              <Typography>
                This is where you can view a single workout completed in the past. The sets that you completed in the workout are shown the same way you would view them in the page for doing a workout. At the bottom of the page, you can see a button to edit the workout. This will essentially set the workout as unfinished again, meaning you can edit it on the page for doing a workout. This also means that you can&apos;t edit a finished workout, if you currently have an unfinished workout.
              </Typography>
              <Typography variant="h4">
                The &quot;past sets&quot; page:
              </Typography>
              <Typography>
                This is where you can view all of your completed sets at once independent of the workout that they are associated with. You can also filter to show only the sets completed on a single exercise to monitor your proggress on it.
              </Typography>
              <Typography variant="h4">
                The user page:
              </Typography>
              <Typography>
                This is where you can view the information associated with your account. You can change your name or username as well as your password.
              </Typography>
            </>
          )
          : (
            <Typography>
              Click &quot;login&quot; at the top to login or &quot;register&quot; if you aren&apos;t registered yet
            </Typography>
          )
      }
    </Box>
  );
};

export default Home;
