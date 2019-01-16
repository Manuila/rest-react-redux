import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import posts from './routes/postRoutes';
import config from './config';


const app = express();

// enable CORS on the server
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json());
app.use('/posts', posts);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.listen(config.EXPRESS_PORT, () => {
  console.log(`Server is running on port ${config.EXPRESS_PORT}!`);
});

export default app;