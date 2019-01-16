const config = {
  MONGO_URI: process.env.MONGO_URL || 'mongodb://mongo:27017/posts_test',
  EXPRESS_PORT: process.env.PORT || 3000,
};

export default config;