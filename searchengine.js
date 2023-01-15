import needle from 'needle';

const token =
  'AAAAAAAAAAAAAAAAAAAAANMVlAEAAAAA6HALSRbjXErQ0vSRHpGSd2vv5t0%3DXYaVYTXEs2f4r6CtCE1o7mHBmCbA62vuDke4ZPdwRpJ6K95YWT';

const endpointURL = 'https://api.twitter.com/2/users/by?usernames=';

async function getUser(username) {
  const params = {
    usernames: 'username',
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

(async () => {
  try {
    // Make request
    const response = await getUser();
    console.dir(response, {
      depth: null,
    });
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
  process.exit();
})();
