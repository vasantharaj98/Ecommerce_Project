import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const getBanner = () => {
  return axios.get(API_URL + "banner", { headers: authHeader() });
};

const createBanner = (paydata) => {
  return axios.post(API_URL + "banner", paydata, { headers: authHeader() });
};

const updateBanner = (c_id, paydata) => {
  return axios.put(API_URL + `banner/${c_id}`, paydata, { headers: authHeader() });
};

const deleteBanner = (c_id) => {
  return axios.delete(API_URL + `banner/${c_id}`, { headers: authHeader() });
};


const bannerService = {
  getBanner,
  createBanner,
  updateBanner,
  deleteBanner
};

export default bannerService;