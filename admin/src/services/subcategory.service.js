import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const getSubCategory = () => {
  return axios.get(API_URL + "product/subcategory", { headers: authHeader() });
};

const createSubCategory = (paydata) => {
  return axios.post(API_URL + "product/subcategory", paydata, { headers: authHeader() });
};

const updateSubCategory = (c_id, paydata) => {
  return axios.put(API_URL + `product/subcategory/${c_id}`, paydata, { headers: authHeader() });
};

const deleteSubCategory = (c_id) => {
  return axios.delete(API_URL + `product/subcategory/${c_id}`, { headers: authHeader() });
};


const subCategoryService = {
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory
};

export default subCategoryService;