import axios from "axios";

const API_URL = 'https://6781424785151f714b0a074d.mockapi.io/light';

export const fetchItems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createItem = async (item: { name: string }) => {
  const response = await axios.post(API_URL, item);
  return response.data;
};

export const updateItem = async (id: string, item: { name: string }) => {
  const response = await axios.put(`${API_URL}/${id}`, item);
  return response.data;
};

export const deleteItem = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};