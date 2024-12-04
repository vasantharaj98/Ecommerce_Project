import axios from "axios";
import authHeader from "./auth-header";

const LIVE_API_URL = process.env.REACT_APP_LIVE_API_URL;

const ln = localStorage.getItem("ln") || 'EN';

const getLiveNews = (lang) => {
    return axios.get(LIVE_API_URL + 'news-svc/api/v1/home', {
        headers: {
          'accept-language': lang === 'EN' ? 'en' : 'ta'
        }
      });
};

const getLiveNewsbyId = (lang, paramData) => {
  return axios.get(LIVE_API_URL + `core-svc/api/v1/news/${paramData}`);
};

const getCities = (lang) => {
  return axios.get(LIVE_API_URL + 'core-svc/api/v1/cities');
};

const getLiveCityNews = (lang, params) => {
  return axios.get(LIVE_API_URL + 'news-svc/api/v1/news', {
      params : params,
      headers: {
        'accept-language': lang === 'EN' ? 'en' : 'ta'
      }
    });
};

const liveNewsService = {
  getLiveNews,
  getLiveNewsbyId,
  getCities,
  getLiveCityNews
};

export default liveNewsService