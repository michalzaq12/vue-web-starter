import api from '.';

const POST_RESOURCE = 'posts';

export default {
  get () {
    return api.get(POST_RESOURCE)
  }
}
