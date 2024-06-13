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

const getSingle = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getSingleWithExercises = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}?includeExercises`);
  return response.data;
};

const getSingleWithSetsAndExercises = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}?includeSets&includeExercises`);
  return response.data;
};

export default {
  addWorkout,
  getAll,
  getSingle,
  deleteWorkout,
  getSingleWithExercises,
  getSingleWithSetsAndExercises,
};
