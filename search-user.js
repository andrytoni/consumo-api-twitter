import needle from 'needle';
import 'dotenv/config';

const token = process.env.BEARER_TOKEN;

const endpointURL = 'https://api.twitter.com/2/users/by?usernames=';

async function getUser(username) {
  const params = {
    usernames: username,
    'user.fields':
      'created_at,description,profile_image_url,verified,verified_type',
    'expansions': 'pinned_tweet_id',
  };

  const res = await needle('get', endpointURL, params, {
    headers: {
      'User-Agent': 'v2UserLookupJS',
      'authorization': `Bearer ${token}`,
    },
  });

  if (res.body) {
    return res.body;
  } else {
    throw new Error('Unsuccessful request');
  }
}

export default getUser;
