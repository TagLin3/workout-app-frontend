import axios from "axios";

const baseUrl = "http://localhost:3001/api/workouts";

const addWorkout = async (workout) => {
  const response = await axios.post(baseUrl, workout);
  return response.data;
};

export default { addWorkout };
