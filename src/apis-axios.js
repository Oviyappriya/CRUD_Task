import axios from "axios";

const baseUrl = "https://661e664a98427bbbef04709c.mockapi.io/api/v1/todos";

const prodInstance = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar", batch: "FSD56WE-T" },
});

const getAllItems = async () => {
  const response = await prodInstance.get("");
  return response.data;
};

const getProduct = async (itemId) => {
  return (await prodInstance.get(`${itemId}`)).data;
};

const createProduct = async (pdData) => {
  const response = await prodInstance.post("", pdData);
  return response.data;
};

const updateProduct = async (pdData, itemId) => {
  return (await prodInstance.put(`${itemId}`, pdData)).data;
};

const deleteProduct = async (itemId) => {
  const response = await prodInstance.delete(`${itemId}`);
  return response.data;
};

export { getAllItems, deleteProduct, getProduct, updateProduct, createProduct };