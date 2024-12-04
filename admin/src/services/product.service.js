import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const getProduct = () => {
  return axios.get(API_URL + "product", { headers: authHeader() });
};

const createProduct = (paydata) => {
  return axios.post(API_URL + "product", paydata, { headers: authHeader() });
};

const updateProduct = (c_id, paydata) => {
  return axios.put(API_URL + `product/${c_id}`, paydata, { headers: authHeader() });
};

const deleteProduct = (c_id) => {
  return axios.delete(API_URL + `product/${c_id}`, { headers: authHeader() });
};


const productService = {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};

export default productService;