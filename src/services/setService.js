import axios from "axios";

const baseUrl = "/api/sets";

const getAll = async (includeExercises) => {
  const response = await axios.get(`${baseUrl}${includeExercises ? "?includeExercises" : ""}`);
  return response.data;
};

const getAllForExercise = async (exercise, includeExercises) => {
  const response = await axios.get(
    `${baseUrl}?filterByExercise=${exercise}${includeExercises ? "&includeExercises" : ""}`,
  );
  return response.data;
};

const addSet = async (set) => {
  const response = await axios.post(baseUrl, set);
  return response.data;
};

const addMultipleSets = async (sets) => {
  const response = await axios.post(`${baseUrl}?saveMultiple`, sets);
  return response.data;
};

const deleteSet = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

const updateSet = async (id, update) => {
  const response = await axios.put(`${baseUrl}/${id}`, update);
  return response.data;
};

export default {
  getAll, addSet, addMultipleSets, getAllForExercise, deleteSet, updateSet,
};
