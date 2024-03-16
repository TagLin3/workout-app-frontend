import axios from "axios";

const baseUrl = "http://localhost:3001/api/routines";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getSingle = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const addRoutine = async (routine) => {
  const response = await axios.post(baseUrl, routine);
  return response.data;
};

export default { getAll, getSingle, addRoutine };
