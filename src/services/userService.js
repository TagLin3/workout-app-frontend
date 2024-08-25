import axios from "axios";

const baseUrl = "/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getSingle = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const addUser = async (user) => {
  const response = await axios.post(baseUrl, user);
  return response.data;
};

const updateUser = async (id, update) => {
  const response = await axios.put(`${baseUrl}/${id}`, update);
  return response.data;
};

const changePassword = async (id, oldPassword, newPassword) => {
  const response = await axios.put(`${baseUrl}/${id}/changePassword`, {
    oldPassword, newPassword,
  });
  return response.data;
};

export default {
  getAll, addUser, updateUser, getSingle, changePassword,
};
