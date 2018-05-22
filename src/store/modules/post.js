import postService from '@/api/post'
import {action, mutation, getter} from './post.type';


const state = {
  currentPage: Number,
  itemsPerPage: Number,
  posts: [],
  isLoading: false,
};

const getters = {
  [getter.ALL_POSTS](state, page, itemsPerPage){
    if (page === undefined && itemsPerPage === undefined){
      return state.posts;
    }
    return state.posts.slice((page - 1) * itemsPerPage, page * state.itemsPerPage);
  },
  [getter.POST_PER_PAGE](state){
    return state.posts.slice((state.currentPage - 1) * state.itemsPerPage, state.currentPage * state.itemsPerPage);
  },
  [getter.IS_LOADING](state){
    return state.isLoading;
  },
  [getter.POSTS_COUNT](state){
    return state.posts.length;
  }
};

const actions = {
  [action.FETCH_POSTS]({ commit }) {
    commit(mutation.FETCH_START);
    return postService.query().then((posts) => {
      commit(mutation.FETCH_END, posts.data);
    })
  }
};

function randomAvatarColor(){
  const colors = ['red', 'pink', 'purple', 'indigo', 'blue'];
  let key = Math.floor(Math.random() * colors.length);
  return colors[key];
}

const mutations = {
  [mutation.FETCH_START](state) {
    state.isLoading = true
  },
  [mutation.FETCH_END](state, posts){
    posts.forEach((post) => post.color =  randomAvatarColor());
    state.posts = posts;
    state.isLoading = false;
  },
  [mutation.SET_PAGE](state, page){
    state.currentPage = page;
  },
  [mutation.SET_ITEMS_PER_PAGE](state, itemsPerPage){
    state.itemsPerPage = itemsPerPage;
  }
};


export default {
  state,
  getters,
  actions,
  mutations
}
