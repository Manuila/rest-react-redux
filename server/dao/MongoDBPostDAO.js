import Post from '../models/post';
import PostDAO from './PostDAO';
import mongoose from 'mongoose';

export default class MongoDBPostDAO extends PostDAO {
  constructor(mongoURI) {
    super();
    this.mongoURI = mongoURI;
  }

  get connect() {
    return mongoose.connect(this.mongoURI);
  }
  /**
   * @param {Object} newPost
   * @returns {Promise}
   */
  add(newPost) {
    return new Promise((resolve, reject) => {
      this.connect.then(() => {
        const post = new Post(newPost);
        return post.save();
      })
        .then((result) => {
          resolve(result);
          mongoose.connection.close();
        })
        .catch((error) => {
          reject(error);
          mongoose.connection.close();
        });
    });
  }

  /**
   * @param {String} id
   * @returns {Promise}
   */
  remove(id) {
    return new Promise((resolve, reject) => {
      this.connect.then(() => Post.findByIdAndRemove(id))
        .then((result) => {
          resolve(result);
          mongoose.connection.close();
        })
        .catch((error) => {
          reject(error);
          mongoose.connection.close();
        });
    });
  }

  /**
   * @param {String} id
   * @returns {Promise}
   */
  getById(id) {
    return new Promise((resolve, reject) => {
      this.connect.then(() => Post.findOne({
        _id: id
      }))
        .then((result) => {
          resolve(result);
          mongoose.connection.close();
        })
        .catch((error) => {
          reject(error);
          mongoose.connection.close();
        });
    });
  }

  /**
   * @param {Object} post
   * @returns {Promise}
   */
  update(post) {
    return new Promise((resolve, reject) => {
      this.connect.then(() => Post.update({
        _id: post._id
      }, {
        title: post.title,
        description: post.description,
        isPublished: post.isPublished,
        isLiked: post.isLiked,
      }))
        .then((result) => {
          resolve(result);
          mongoose.connection.close();
        })
        .catch((error) => {
          reject(error);
          mongoose.connection.close();
        });
    });
  }

  /**
   * @param {Number} limit
   * @param {Number} skip
   * @returns {Promise}
   */
  getAll(limit = 10, skip) {
    return new Promise((resolve, reject) => {
      this.connect.then(() => Post.find()
        .skip(limit*skip)
        .limit(limit)
        .sort('-date'))
        .then((result) => {
          resolve(result);
          mongoose.connection.close();
        })
        .catch((error) => {
          reject(error);
          mongoose.connection.close();
        });
    });
  }
}