import { fromJS } from 'immutable';
import * as types from '../actions/actionTypes';

const initialState = fromJS({
  posts: [],
});

const postReducer = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case types.GET_POSTS: {
      if (state.get('posts').count() === 0) {
        return state.set('posts', fromJS(action.posts));
      }
      return state.update('posts', posts =>
        posts.concat(fromJS(action.posts)));
    }
    case types.ADD_POST: {
      return state.update('posts', posts =>
        posts.unshift(fromJS(action.post)));
    }
    case types.DELETE_POST: {
      return state.update('posts', posts =>
        posts.filter(post =>
          post.get('_id') !== action.postId));
    }
    case types.UPDATE_POST: {
      return state.update('posts', (posts) => {
        const index = posts.findIndex(post =>
          post.get('_id') === action.post.get('_id'));
        return posts.set(index, action.post);
      });
    }
    default:
      break;
  }
  return newState;
};
export default postReducer;
