import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const getCategory = () => {
  return axios.get(API_URL + "product/category", { headers: authHeader() });
};

const createCategory = (paydata) => {
  return axios.post(API_URL + "product/category", paydata, { headers: authHeader() });
};

const updateCategory = (c_id, paydata) => {
  return axios.put(API_URL + `product/category/${c_id}`, paydata, { headers: authHeader() });
};

const deleteCategory = (c_id) => {
  return axios.delete(API_URL + `product/category/${c_id}`, { headers: authHeader() });
};


const categoryService = {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
};

export default categoryService;