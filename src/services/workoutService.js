import axios from "axios";

const baseUrl = "http://localhost:3001/workouts";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getSingle = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export default { getAll, getSingle };
