import PostService from '../services/PostService';
import MongoDBPostDAO from '../dao/MongoDBPostDAO';
import {
  logger
} from '../utils';
import config from '../config';

const postDAO = new MongoDBPostDAO(config.MONGO_URI);
const postService = new PostService(postDAO);

export default {

  getPosts(req, res) {
    postService.getAll(Number(req.query.limit), Number(req.query.page))
      .then((posts) => {
        res.status(200).json({
          posts
        });
        logger.info('Posts successful loaded');
      })
      .catch((error) => {
        res.status(404).send(error);
        logger.error(`Cannot loaded. Error details: ${error.message}`);
      });
  },

  deletePost(req, res) {
    const idPost = req.params.id;
    postService.remove(idPost)
      .then((post) => {
        if (!post) {
          res.status(404).json({
            message: 'Not found'
          });
          logger.error(`Cannot delete. Error details: NotFound: No post found for id ${idPost}`);
        } else {
          res.status(200).json({
            post
          });
          logger.info(`Post successful removed. Post details: ${post}`);
        }
      })
      .catch((error) => {
        res.status(400).send(error);
        logger.error(`Cannot delete. Error details: ${error.message}`);
      });
  },

  addPost(req, res) {
    if (!req.body.post.title) {
      res.status(403).end();
      logger.error('Cannot save. Error details: title is empty');
    } else {
      const newPost = {
        title: req.body.post.title,
        description: req.body.post.description,
      };
      postService.add(newPost)
        .then((post) => {
          res.status(200).json({
            post
          });
          logger.info(`Post successful saved. Post details: ${post}`);
        })
        .catch((error) => {
          res.status(400).send(error);
          logger.error(`Cannot save. Error details: ${error.message}`);
        });
    }
  },

  updatePost(req, res) {
    const idPost = req.params.id;
    const post = req.body.post;
    if (!post.title) {
      res.status(403).end();
      logger.error('Cannot update. Error details: title is empty');
    } else {
      const updatedPost = Object.assign(post, {
        _id: idPost
      });
      postService.update(updatedPost)
        .then((data) => {
          res.status(200).json({
            data
          });
          logger.info(`Post successful updated. Post details: ${updatedPost._id}`);
        })
        .catch((error) => {
          res.status(400).send(error);
          logger.error(`Cannot update. Error details: ${error.message}`);
        });
    }
  },

  getPost(req, res) {
    const idPost = req.params.id;
    postService.getById(idPost)
      .then((post) => {
        if (!post) {
          res.status(404).end();
          logger.error(`Cannot load. Error details: NotFound: No post found for id ${idPost}`);
        } else {
          res.status(200).json({
            post
          });
          logger.info(`Post successful loaded. Post details: ${post}`);
        }
      })
      .catch((error) => {
        res.status(400).send(error);
        logger.error(`Cannot load. Error details: ${error.message}`);
      });
  },
};