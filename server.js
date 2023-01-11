import express from 'express';
import cors from 'cors';
import getRequest from './search-engine.js';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/tweets', async (req, res) => {
  const tweets = await getRequest();
  res.json(tweets.data);
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
