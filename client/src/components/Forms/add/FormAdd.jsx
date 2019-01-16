import React, { PureComponent, createRef, Fragment } from 'react';
import PropTypes from 'prop-types';

import PopupWindow from '../../../common/Modal/PopupWindow';
import { addPost } from '../../../api/posts';

import Overlay from '../../../common/Overlay/Overlay';
import Spinner from '../../../common/Spinner/Spinner';

import './form-add.scss';


export default class FormAdd extends PureComponent {
  static propTypes = {
    toggleIsOpen: PropTypes.func.isRequired,
  };

  state = {
    isLoading: false,
  };

  titleInput = createRef();

  descriptionInput = createRef();

  componentDidMount() {
    if (this.titleInput) this.titleInput.current.focus();
  }

  /**
   * @param {boolean} isLoading
   * */
  toggleIsLoading = isLoading => this.setState({ isLoading });

  addPost = async () => {
    const { toggleIsOpen } = this.props;
    const title = this.titleInput.current.value;
    const description = this.descriptionInput.current.value;
    this.toggleIsLoading(true);
    try {
      await addPost({
        title,
        description,
      });
    } catch (e) {
      throw e;
    } finally {
      toggleIsOpen(false);
      this.toggleIsLoading(false);
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.addPost();
  }
  render() {
    const { toggleIsOpen } = this.props;
    const { isLoading } = this.state;
    return (
      <Fragment>
        {isLoading
          ?
            <Overlay
              active
            >
              <Spinner />
            </Overlay>
          :
            <PopupWindow
              className="modal-modal"
              title="Add post"
              hasCloseIcon
              primaryButtonLabel="Ok"
              primaryButtonAction={this.onSubmit}
              secondaryButtonLabel="Cancel"
              secondaryButtonAction={() => toggleIsOpen(false)}
            >
              <form className="form-add" onSubmit={this.onSubmit}>
                <div className="form-add__row">
                  <input
                    className="form-add-input"
                    ref={this.titleInput}
                    placeholder="title"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="form-add__row">
                  <textarea
                    className="form-add-textarea"
                    rows="5"
                    name="text"
                    ref={this.descriptionInput}
                    placeholder="description"
                  />
                </div>
              </form>
            </PopupWindow>
        }
      </Fragment>
    );
  }
}
