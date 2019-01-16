export default class PostService {
  constructor(postDAO) {
    this.postDAO = postDAO;
  }

  /**
   * @param {Object} post
   * @returns {Promise}
   */
  add(post){
    return this.postDAO.add(post);
  }

  /**
   * @param {String} id
   * @returns {Promise}
   */
  remove(id) {
    return this.postDAO.remove(id);
  }

  /**
   * @param {String} id
   * @returns {Promise}
   */
  getById(id) {
    return this.postDAO.getById(id);
  }

  /**
   * @param {Object} post
   * @returns {Promise}
   */
  update(post) {
    return this.postDAO.update(post);
  }

  /**
   * @param {Number} limit
   * @param {Number} skip
   * @returns {Promise}
   */
  getAll(limit, skip) {
    return this.postDAO.getAll(limit, skip);
  }
}
