import axios from "axios";

const baseUrl = "http://localhost:3001/api/workouts";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addWorkout = async (workout) => {
  const response = await axios.post(baseUrl, workout);
  return response.data;
};

const deleteWorkout = async (id) => {
  await axios.delete(`${baseUrl}/${id}`);
};

const getSingle = async (id, sets, exercises) => {
  if (sets === true) {
    if (exercises === true) {
      const response = await axios.get(`${baseUrl}/${id}?includeSets&includeExercises`);
      return response.data;
    }
    const response = await axios.get(`${baseUrl}/${id}?includeSets`);
    return response.data;
  }
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export default {
  addWorkout, getAll, getSingle, deleteWorkout,
};
