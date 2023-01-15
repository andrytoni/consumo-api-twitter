import needle from 'needle';

const token =
  'AAAAAAAAAAAAAAAAAAAAANMVlAEAAAAA6HALSRbjXErQ0vSRHpGSd2vv5t0%3DXYaVYTXEs2f4r6CtCE1o7mHBmCbA62vuDke4ZPdwRpJ6K95YWT';
let endpointUrl = 'https://api.twitter.com/2/tweets/search/recent';
let type;
async function getTweets(query, type) {
  if (query == undefined || !query) return {};

  const params = {
    'query': query + ' -is:retweet has:images',
    'expansions': 'author_id,attachments.media_keys',
    'tweet.fields': 'author_id,created_at',
    'user.fields': 'location,username,profile_image_url',
    'media.fields': 'preview_image_url,url,type',
  };

  const res = await needle('get', endpointUrl, params, {
    headers: {
      'User-Agent': 'v2RecentSearchJS',
      'authorization': `Bearer ${token}`,
    },
  });
  // console.log(res.body.includes.media);
  // for (let eachData of res.body.data) {
  //   console.log(eachData);
  // }

  if (res.body) {
    return res.body;
  } else {
    throw new Error('Unsuccessful request');
  }
}

export default getTweets;
