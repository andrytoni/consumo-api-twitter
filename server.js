import express from 'express';
import cors from 'cors';
import searchTweets from './search-tweets.js';
import getUser from './search-user.js';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/tweets', async (req, res) => {
  let response;

  if (req.query.type == 'user') {
    response = await getUser(req.query.searchQuery);
  } else {
    response = await searchTweets(req.query.searchQuery, req.query.type);
  }

  res.json(response);
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
