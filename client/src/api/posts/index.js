import axios from 'axios';

const url = 'http://localhost:3000';


/**
 * @param {number} limit
 * @param {number} page
 * @returns {Promise}
 * */
export const fetchPosts = (limit, page) => axios.get(`${url}/posts?limit=${limit}&page=${page}`);

/**
 * @param {string} postId
 * @returns {Promise}
 * */
export const fetchDeletePost = postId => axios.delete(`${url}/posts/${postId}`);

/**
 * @param {Object} post
 * @returns {Promise}
 * */
export const fetchAddPost = post => axios.post(`${url}/posts`, { post });

/**
 * @param {string} postId
 * @returns {Promise}
 * */
export const fetchPost = postId => axios.get(`${url}/posts/${postId}`);

/**
 * @param {Immutable.Map} _post
 * @returns {Promise}
 * */
export const fetchUpdatePost = (_post) => {
  const post = _post.toObject();
  return axios.put(`${url}/posts/${post._id}`, { post });
};
