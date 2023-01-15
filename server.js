import express from 'express';
import cors from 'cors';
import getTweets from './search-engine.js';

const app = express();
const nothingFound = [{ text: 'Não há resultados para a pesquisa.' }];

app.use(cors());

app.use(express.json());

app.get('/tweets', async (req, res) => {
  const tweets = await getTweets(req.query.searchTweet);
  if (!tweets?.data) {
    res.json(nothingFound);
  } else {
    res.json(tweets.data);
  }
});

// app.get('/search', async (req, res) => {
//   query = req.query;
//   console.log(query);

//   res.redirect('/tweets');
// });

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
