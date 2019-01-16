import log4js from 'log4js';

log4js.configure({
  appenders: { post: { type: 'file', filename: 'post.log' } },
  categories: { default: { appenders: ['post'], level: 'info' } }
});
 
export const logger = log4js.getLogger('post');