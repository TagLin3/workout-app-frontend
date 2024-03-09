import axios from "axios";

const baseUrl = "http://localhost:3001/exercises";

const getSingle = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export default { getSingle };
