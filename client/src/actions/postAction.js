import * as types from './actionTypes';

export const getPostsSuccess = posts => ({
  type: types.GET_POSTS,
  posts,
});

export const addPostSuccess = post => ({
  type: types.ADD_POST,
  post,
});

export const deletePostSuccess = postId => ({
  type: types.DELETE_POST,
  postId,
});

export const updatePostSuccess = post => ({
  type: types.UPDATE_POST,
  post,
});
