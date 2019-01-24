import React from 'react';
import PropTypes from 'prop-types';
import PostHeaderButtonEdit from './__button/PostHeaderButtonEdit';

const PostHeader = ({ label }) => (
  <header className="todo-component__header">
    <h1 className="todo-component__header-title">{label}</h1>
    <PostHeaderButtonEdit />
  </header>
);

PostHeader.propTypes = {
  label: PropTypes.string.isRequired,
};

export default PostHeader;
