import needle from 'needle';

const token =
  'AAAAAAAAAAAAAAAAAAAAANMVlAEAAAAA6HALSRbjXErQ0vSRHpGSd2vv5t0%3DXYaVYTXEs2f4r6CtCE1o7mHBmCbA62vuDke4ZPdwRpJ6K95YWT';

const endpointUrl = 'https://api.twitter.com/2/tweets/search/recent';

async function getRequest() {
  const params = {
    'query': 'lula',
    'tweet.fields': 'author_id',
  };

  const res = await needle('get', endpointUrl, params, {
    headers: {
      'User-Agent': 'v2RecentSearchJS',
      'authorization': `Bearer ${token}`,
    },
  });

  if (res.body) {
    return res.body;
  } else {
    throw new Error('Unsuccessful request');
  }
}

// (async () => {
//   try {
//     const response = await getRequest();
//     console.dir(response, {
//       depth: null,
//     });
//   } catch (e) {
//     console.log(e);
//     process.exit(-1);
//   }
//   process.exit();
// })();

export default getRequest;
