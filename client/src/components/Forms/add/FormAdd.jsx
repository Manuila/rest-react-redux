import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PopupWindow from '../../../common/Modal/PopupWindow';

import { addPost } from '../../../actions/posts';

import Overlay from '../../../common/Overlay/Overlay';
import Spinner from '../../../common/Spinner/Spinner';

import './form-add.scss';


class FormAdd extends PureComponent {
  static propTypes = {
    toggleIsOpen: PropTypes.func.isRequired,
    dispatchAddPost: PropTypes.func.isRequired,
  };

  state = {
    isLoading: false,
    titleValue: '',
    descriptionValue: '',
  };

  componentDidMount() {
    if (this.titleInput) this.titleInput.focus();
  }

  /**
   * @param {Event} event
   */
  handleTitleValueChange = (event) => {
    this.setState({ titleValue: event.target.value });
  };

  /**
   * @param {Event} event
   */
  handleDescriptionValueChange = (event) => {
    this.setState({ descriptionValue: event.target.value });
  };

  /**
   * @param {boolean} isLoading
   * */
  toggleIsLoading = isLoading => this.setState({ isLoading });

  addPost = async () => {
    const { toggleIsOpen, dispatchAddPost } = this.props;
    const { titleValue, descriptionValue } = this.state;
    this.toggleIsLoading(true);
    try {
      await dispatchAddPost({
        titleValue,
        descriptionValue,
      });
    } catch (e) {
      throw e;
    } finally {
      toggleIsOpen(false);
      this.toggleIsLoading(false);
    }
  };

  /**
   * @param {Event} event
   */
  onSubmit = (event) => {
    event.preventDefault();
    this.addPost();
  };

  render() {
    const { toggleIsOpen } = this.props;
    const { isLoading, titleValue, descriptionValue } = this.state;
    return (
      <Fragment>
        { isLoading
          ? (
            <Overlay
              active
            >
              <Spinner />
            </Overlay>
          )
          : (
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
                    value={titleValue}
                    onChange={this.handleTitleValueChange}
                    ref={(input) => { this.titleInput = input; }}
                    className="form-add-input"
                    placeholder="title"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="form-add__row">
                  <textarea
                    value={descriptionValue}
                    onChange={this.handleDescriptionValueChange}
                    className="form-add-textarea"
                    rows="5"
                    name="text"
                    ref={this.descriptionInput}
                    placeholder="description"
                  />
                </div>
              </form>
            </PopupWindow>
          )
        }
      </Fragment>
    );
  }
}

const mapDispatchToProps = {
  dispatchAddPost: addPost,
};

export default connect(null, mapDispatchToProps)(FormAdd);
