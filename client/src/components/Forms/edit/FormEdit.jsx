/* eslint-disable react/sort-comp */
import React, { PureComponent, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import PopupWindow from '../../../common/Modal/PopupWindow';
import Overlay from '../../../common/Overlay/Overlay';
import { getPost, updatePost } from '../../../api/posts/index';
import Spinner from '../../../common/Spinner/Spinner';

import './form-edit.scss';


export default class FormEdit extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    toggleIsOpen: PropTypes.func.isRequired,
  };

  titleInput = createRef();

  descriptionInput = createRef();

  state = {
    post: Map(),
    isLoading: false,
  };

  /**
   * @param {boolean} isLoading
   * */
  toggleIsLoading = isLoading => this.setState({ isLoading });

  /**
   * @param {Immutable.Map} post
   * */
  setPost = post => this.setState({ post });

  async componentDidMount() {
    const { id } = this.props;
    this.toggleIsLoading(true);
    try {
      const post = await getPost(id);
      this.setPost(Map(post));
    } catch (e) {
      throw e;
    } finally {
      this.toggleIsLoading(false);
      if (this.titleInput) this.titleInput.current.focus();
    }
  }

  updatePost = async () => {
    const { post } = this.state;
    const { toggleIsOpen } = this.props;
    const title = this.titleInput.current.value;
    const description = this.descriptionInput.current.value;
    const updatedPost = post
      .set('title', title)
      .set('description', description);
    this.toggleIsLoading(true);
    try {
      await updatePost(updatedPost);
    } catch (e) {
      throw e;
    } finally {
      toggleIsOpen(false);
      this.toggleIsLoading(false);
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.updatePost();
  }

  render() {
    const { isLoading, post } = this.state;
    const { toggleIsOpen } = this.props;
    return (
      <Fragment>
        { isLoading
          ?
            <Overlay
              active
            >
              <Spinner />
            </Overlay>
          :
            <PopupWindow
              className="modal-modal"
              title="Edit post"
              hasCloseIcon
              primaryButtonLabel="Ok"
              primaryButtonAction={this.onSubmit}
              secondaryButtonLabel="Cancel"
              secondaryButtonAction={() => toggleIsOpen(false)}
            >
              <form className="form-edit" onSubmit={this.onSubmit}>
                <div className="form-edit__row">
                  <input
                    required
                    className="form-edit-input"
                    ref={this.titleInput}
                    defaultValue={post.get('title')}
                  />
                </div>
                <div className="form-edit__row">
                  <textarea
                    className="form-edit-textarea"
                    rows="5"
                    name="text"
                    ref={this.descriptionInput}
                    defaultValue={post.get('description')}
                  />
                </div>
              </form>
            </PopupWindow>
        }
      </Fragment>
    );
  }
}

