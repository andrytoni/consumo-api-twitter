import needle from 'needle';
import 'dotenv/config';

const token = process.env.BEARER_TOKEN;
let endpointUrl = 'https://api.twitter.com/2/tweets/search/recent';

async function getTweets(query, type) {
  if (query == undefined || !query) return {};

  let queryString = query + ' -is:retweet';

  if (type == 'images') {
    queryString = query + ' -is:retweet has:images';
  } else if (type == 'videos') {
    queryString = query + ' -is:retweet has:videos';
  }

  let params = {
    'query': queryString,
    'expansions': 'author_id,attachments.media_keys',
    'tweet.fields': 'author_id,created_at,public_metrics',
    'user.fields': 'location,username,profile_image_url',
    'media.fields': 'preview_image_url,url,type',
  };

  const res = await needle('get', endpointUrl, params, {
    headers: {
      'User-Agent': 'v2RecentSearchJS',
      'authorization': `Bearer ${token}`,
    },
  });

  if (res.body) {
    console.log(res.body.data);

    return res.body;
  } else {
    throw new Error('Unsuccessful request');
  }
}

export default getTweets;
