import axios from "axios";

const baseUrl = "/api/routines";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getActive = async () => {
  const response = await axios.get(`${baseUrl}?activeOnly`);
  return response.data;
};

const getInactive = async () => {
  const response = await axios.get(`${baseUrl}?inactiveOnly`);
  return response.data;
};

const toggleActivity = async (id) => {
  const response = await axios.put(`${baseUrl}/${id}/toggleActivity`);
  return response.data;
};

const deleteRoutine = async (id) => {
  await axios.delete(`${baseUrl}/${id}`);
};

const getSingle = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const addRoutine = async (routine) => {
  const response = await axios.post(baseUrl, routine);
  return response.data;
};

export default {
  getAll, getActive, getInactive, getSingle, addRoutine, toggleActivity, deleteRoutine,
};
