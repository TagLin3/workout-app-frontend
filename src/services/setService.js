import axios from "axios";

const baseUrl = "http://localhost:3001/api/sets";

const addSet = async (set) => {
  const response = await axios.post(baseUrl, set);
  return response.data;
};

const addMultipleSets = async (sets) => {
  const response = await axios.post(`${baseUrl}?saveMultiple`, sets);
  return response.data;
};

export default { addSet, addMultipleSets };
