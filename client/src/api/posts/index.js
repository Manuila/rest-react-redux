import axios from 'axios';
import store from '../../store/store';
import {
  getPostsSuccess,
  addPostSuccess,
  deletePostSuccess,
  updatePostSuccess,
} from '../../actions/postAction';

const url = 'http://localhost:3000';

const posts = [
  {
    id: 1,
    title: '1',
    description: '1',
  },
  {
    id: 2,
    title: '2',
    description: '2',
  },
];

/**
 * @param {number} limit
 * @param {number} page
 * */
// export const getPosts = (limit, page) => axios.get(`${url}/posts?limit=${limit}&page=${page}`)
//   .then((res) => {
//     store.dispatch(getPostsSuccess(res.data.posts));
//   });

  export const getPosts = (limit, page) => store.dispatch(getPostsSuccess(posts));
/**
 * @param {string} postId
 * */
export const deletePost = (postId) => {
  axios.delete(`${url}/posts/${postId}`)
    .then((res) => {
      store.dispatch(deletePostSuccess(postId));
      return res;
    });
};

/**
 * @param {Object} post
 * */
export const addPost = post => axios.post(`${url}/posts`, { post })
  .then((res) => {
    store.dispatch(addPostSuccess(res.data.post));
  });

/**
 * @param {string} postId
 * */
export const getPost = postId => axios.get(`${url}/posts/${postId}`)
  .then(res => res.data.post);

/**
 * @param {Immutable.Map} _post
 * */
export const updatePost = (_post) => {
  const post = _post.toObject();
  return axios
    .put(`${url}/posts/${post._id}`, { post })
    .then(() => {
      store.dispatch(updatePostSuccess(_post));
    });
};

