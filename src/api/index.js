import axios from 'axios'
import errorHandler from './errorHandler';


const API_URL = 'https://jsonplaceholder.typicode.com/';

export default {
  API_URL,

  init () {
    axios.defaults.baseURL = API_URL;
    axios.interceptors.response.use(res => res, errorHandler);
    this.setHeaders();
  },

  setHeaders () {
    // e.g. vue.axios.defaults.headers.common['Authorization'] = TOKEN
  },

  get () {
    return axios.get(...arguments)
  },

  post () {
    return axios.post(...arguments)
  },

  update () {
    return axios.put(...arguments)
  },

  put () {
    return axios.put(...arguments)
  },

  delete () {
    return axios.delete(...arguments)
  }

};
