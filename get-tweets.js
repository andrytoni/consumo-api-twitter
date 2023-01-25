import needle from 'needle';
import 'dotenv/config';

const token = process.env.BEARER_TOKEN;

const endpointURL = 'https://api.twitter.com/2/tweets?ids=';

async function getTweets(ids) {
  const params = {
    'ids': ids,
    'tweet.fields': 'attachments',
    'expansions': 'attachments.media_keys',
    'media.fields':
      'alt_text,duration_ms,preview_image_url,public_metrics,variants',
  };

  const res = await needle('get', endpointURL, params, {
    headers: {
      'User-Agent': 'v2TweetLookupJS',
      'authorization': `Bearer ${token}`,
    },
  });

  // if (res.body?.includes?.media) {
  //   for (let i = 0; i < res.body.includes.media.length; i++) {
  //     console.log(res.body.includes.media[i].variants);
  //   }
  // }
  return res.body;
}

export default getTweets;

// getTweets(
//   '1617991401761050626,1617991275516682242,1617991016489037824,1617990933672497152,1617990588766490626,1617990254740537345,1617989825583546371,1617989754175488000,1617989507428810753,1617989491645468672'
// );
