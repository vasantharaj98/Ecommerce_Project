import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const ln = localStorage.getItem("ln") || 'EN';

const getNews = (lang, paramData, page) => {
  return axios.get(API_URL + `user/${lang}/home/${paramData}?page=${page}`);
};

const getNewsbycity = (lang, paramData, page) => {
  return axios.get(API_URL + `user/${lang}/city/${paramData}?page=${page}`);
};

const getNewsbyTag = (lang, paramData, page) => {
  return axios.get(API_URL + `user/${lang}/tag/${paramData}?page=${page}`);
};

const getNewsbyCategory = (lang, paramData, page) => {
  return axios.get(API_URL + `user/${lang}/category/${paramData}?page=${page}`);
};

const getNewsbyAuthor = (lang, paramData, page) => {
  return axios.get(API_URL + `user/${lang}/author/${paramData}?page=${page}`);
};

const getNewsbyId = (lang, paramData) => {
  return axios.get(API_URL + `user/${lang}/news/${paramData}`);
};

const newsService = {
  getNews,
  getNewsbycity,
  getNewsbyId,
  getNewsbyTag,
  getNewsbyCategory,
  getNewsbyAuthor
};

export default newsService