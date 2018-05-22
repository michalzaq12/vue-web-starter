import vue from 'vue'
import axios from 'axios'
import vueAxios from 'vue-axios'
// import jwtService from '@/common/jwt.api'

const API_URL = 'https://jsonplaceholder.typicode.com/';

export default {
  init () {
    vue.use(vueAxios, axios);
    vue.axios.defaults.baseURL = API_URL;
  },

  setHeader () {
    // vue.axios.defaults.headers.common['Authorization'] = `Token ${jwtService.getToken()}`
  },

  query (resource, params) {
    return vue.axios
      .get(resource, params)
      .catch((error) => {
        throw new Error(`[RWV] ApiService ${error}`)
      })
  },

  get (resource, slug = '') {
    return vue.axios
      .get(`${resource}/${slug}`)
      .catch((error) => {
        throw new Error(`[RWV] ApiService ${error}`)
      })
  },

  post (resource, params) {
    return vue.axios.post(`${resource}`, params)
  },

  update (resource, slug, params) {
    return vue.axios.put(`${resource}/${slug}`, params)
  },

  put (resource, params) {
    return vue.axios.put(`${resource}`, params)
  },

  delete (resource) {
    return vue.axios
      .delete(resource)
      .catch((error) => {
        throw new Error(`[RWV] ApiService ${error}`)
      })
  }
};
