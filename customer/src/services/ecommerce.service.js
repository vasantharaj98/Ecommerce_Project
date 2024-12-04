import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_ECOMMERCE_API_URL;

const ln = localStorage.getItem("ln") || 'EN';

const getProduct = () => {
  return axios.get(API_URL + 'customer/product');
};

const getProductbysubcategory = (paramData, page) => {
  return axios.get(API_URL + `customer/product/subcategory?id=${paramData}&page=${page}&size=10`);
};

const getNewsbyTag = (lang, paramData, page) => {
  return axios.get(API_URL + `user/${lang}/tag/${paramData}?page=${page}`);
};

const getCategory = () => {
  return axios.get(API_URL + 'customer/category');
};

const getBanner = () => {
  return axios.get(API_URL + 'customer/banner');
};

const getNewsbyAuthor = (lang, paramData, page) => {
  return axios.get(API_URL + `user/${lang}/author/${paramData}?page=${page}`);
};

const getProductbyId = (p_id) => {
  return axios.get(API_URL + `customer/product/${p_id}`);
};

const addCart= (paydata) => {
  return axios.post(API_URL + 'customer/cart', paydata, { headers: authHeader() });
};

const getCart= (c_id, page) => {
  return axios.get(API_URL + `customer/cart?id=${c_id}&page=${page}&size=10`, { headers: authHeader() });
};

const updateCart= (c_id, paydata) => {
  return axios.put(API_URL + `customer/cart/${c_id}`, paydata, { headers: authHeader() });
};

const deleteCart= (c_id) => {
  return axios.delete(API_URL + `customer/cart/${c_id}`, { headers: authHeader() });
};

const ecommerceService = {
  getProduct,
  getProductbysubcategory,
  getProductbyId,
  getNewsbyTag,
  getCategory,
  getBanner,
  getNewsbyAuthor,
  addCart,
  getCart,
  updateCart,
  deleteCart
};

export default ecommerceService