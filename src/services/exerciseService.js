import axios from "axios";

const baseUrl = "/api/exercises";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getSingle = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const addExercise = async (exercise) => {
  const response = await axios.post(baseUrl, exercise);
  return response.data;
};

export default { getSingle, getAll, addExercise };
