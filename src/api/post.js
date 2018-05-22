import api from '.';

const POST_RESOURCE = 'posts';

export default {
  query (params) {
    return api.query(POST_RESOURCE, { params })
  },
  get (slug) {
    return api.get(POST_RESOURCE, slug)
  },
  create (params) {
    return api.post(POST_RESOURCE, {article: params})
  },
  update (slug, params) {
    return api.update(POST_RESOURCE, slug, {article: params})
  },
  destroy (slug) {
    return api.delete(`${POST_RESOURCE}/${slug}`)
  }
}
