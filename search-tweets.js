import needle from 'needle';
import 'dotenv/config';
import getTweets from './get-tweets.js';

const token = process.env.BEARER_TOKEN;
let endpointUrl = 'https://api.twitter.com/2/tweets/search/recent';

async function searchTweets(query, type) {
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

  if (res.body?.data) {
    const tweets = organizeTweets(res.body);
    return tweets;
  } else {
    return 'nothing-found';
  }
}

export default searchTweets;

async function organizeTweets(tweets) {
  let organizedTweets = [];
  let tweetsWithVideos = [];
  let videosUrl;
  for (let i = 0; i < tweets.data.length; i++) {
    let tweet = tweets.data[i];
    tweets.includes.users.some((item) => {
      if (item.id == tweet.author_id) {
        tweet.username = item.username;
        tweet.profile_image_url = item.profile_image_url;
        tweet.name = item.name;
        tweet.location = item.location;
      }
    });
    if (tweet?.attachments?.media_keys) {
      tweet.media = [];
      tweet.attachments.media_keys.forEach((key) => {
        tweets.includes.media.some((item) => {
          if (item.media_key == key) {
            tweet.media.push(item);
            if (item.type != 'photo') tweetsWithVideos.push(tweets.data[i].id);
          }
        });
      });
    }
    organizedTweets.push(tweet);
  }

  if (tweetsWithVideos.length > 0) {
    videosUrl = await getTweets(tweetsWithVideos.join());
  }

  for (let i = 0; i < organizedTweets.length; i++) {
    let media = [];
    if (!organizedTweets[i]?.media) continue;

    for (let j = 0; j < organizedTweets[i].media.length; j++) {
      if (organizedTweets[i].media[j].media_key == 'photo') continue;

      if (videosUrl?.includes?.media) {
        videosUrl.includes.media.some((item) => {
          if (item.media_key == organizedTweets[i].media[j].media_key) {
            let url = item.variants.pop();
            organizedTweets[i].media[j].url = url.url;
          }
        });
      }
    }
  }

  return organizedTweets;
}
