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

const editExercise = async (id, editedExercise) => {
  const response = await axios.put(`${baseUrl}/${id}`, editedExercise);
  return response.data;
};

const deleteExercise = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default {
  getSingle, getAll, addExercise, editExercise, deleteExercise,
};
