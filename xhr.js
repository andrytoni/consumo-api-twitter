window.onload = function () {
  document
    .getElementById('searchForm')
    .addEventListener('submit', function (event) {
      event.preventDefault();
      const query = event.target.searchQuery.value;
      const type = event.target.searchSelector.value;

      getRequest(query, type);
    });
};

function getRequest(query, type) {
  let endpoint = 'http://localhost:3000/tweets';
  if (query != undefined) {
    endpoint += '?' + 'searchQuery=' + query + '&type=' + type;
  }
  const xhr = new XMLHttpRequest();

  xhr.open('GET', endpoint);

  xhr.onload = (e) => {
    const response = JSON.parse(xhr.response);

    if (xhr.status === 200 && response != 'nothing-found') {
      if (type != 'user') {
        // const tweets = organizeTweets(response);
        listTweets(response);
      } else {
        listUser(response.data);
      }
    } else if (response == 'nothing-found') {
      nothingFound(query);
    }
  };

  xhr.send();
}
function listTweets(tweets) {
  const nothingFound = document.getElementById('found-nothing');
  nothingFound.classList.add('hidden-class');
  const div = document.getElementById('response-body');
  div.innerHTML = '';

  for (let x = 0; x < tweets.length; x++) {
    const tweetWrap = document.createElement('div');
    tweetWrap.className = 'twitter-wrap';

    const header = document.createElement('div');
    header.className = 'tweet-header';
    tweetWrap.appendChild(header);

    const profileImg = document.createElement('img');
    profileImg.className = 'profile-img';
    profileImg.src = tweets[x].profile_image_url;
    header.appendChild(profileImg);

    const headerInfo = document.createElement('div');
    headerInfo.className = 'tweet-header-info';
    headerInfo.innerText = tweets[x].name;
    header.appendChild(headerInfo);

    const span1 = document.createElement('span');
    span1.innerText = '@' + tweets[x].username;
    headerInfo.appendChild(span1);

    const span2 = document.createElement('span');
    const date = new Date(tweets[x].created_at);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(
      date
    );
    span2.innerText = ' • ' + day + ' de ' + month;
    headerInfo.appendChild(span2);

    const p = document.createElement('p');
    p.innerText = tweets[x].text;
    headerInfo.appendChild(p);

    if (tweets[x]?.media) {
      for (let j = 0; j < tweets[x].media.length; j++) {
        if (tweets[x].media[j].type == 'photo') {
          const tweetImgWrap = document.createElement('div');
          tweetImgWrap.className = 'tweet-media-wrap';
          tweetWrap.appendChild(tweetImgWrap);

          const tweetImg = document.createElement('img');
          tweetImg.src = tweets[x].media[j].url;
          tweetImg.className = 'tweet-img';
          tweetImgWrap.appendChild(tweetImg);
        } else {
          const tweetVideoWrap = document.createElement('div');
          tweetVideoWrap.className = 'tweet-media-wrap';
          tweetWrap.appendChild(tweetVideoWrap);

          const tweetVideo = document.createElement('video');
          tweetVideo.className = 'tweet-video';
          tweetVideo.controls = true;
          tweetVideoWrap.appendChild(tweetVideo);

          const source = document.createElement('source');
          source.src = tweets[x].media[j].url;
          source.type = 'video/mp4';
          tweetVideo.appendChild(source);
        }
      }
    }

    const tweetCounts = document.createElement('div');
    tweetCounts.className = 'tweet-info-counts';
    tweetWrap.appendChild(tweetCounts);

    const comments = document.createElement('div');
    const retweets = document.createElement('div');
    const likes = document.createElement('div');
    const impressions = document.createElement('div');
    comments.className = 'comments';
    retweets.className = 'retweets';
    likes.className = 'likes';
    impressions.className = 'impressions';
    tweetCounts.appendChild(comments);
    tweetCounts.appendChild(retweets);
    tweetCounts.appendChild(likes);
    tweetCounts.appendChild(impressions);

    const commentsIcon = document.createElement('i');
    const retweetsIcon = document.createElement('i');
    const likesIcon = document.createElement('i');
    const impressionsIcon = document.createElement('i');
    commentsIcon.className = 'fa-regular fa-comment';
    retweetsIcon.className = 'fa-solid fa-retweet';
    likesIcon.className = 'fa-regular fa-heart';
    impressionsIcon.className = 'fa-regular fa-eye';
    const commentsCount = document.createElement('div');
    const retweetsCount = document.createElement('div');
    const likesCount = document.createElement('div');
    const impressionsCount = document.createElement('div');
    commentsCount.innerText = tweets[x].public_metrics.reply_count;
    retweetsCount.innerText = tweets[x].public_metrics.retweet_count;
    likesCount.innerText = tweets[x].public_metrics.like_count;
    impressionsCount.innerText = tweets[x].public_metrics.impression_count;
    comments.appendChild(commentsIcon);
    comments.appendChild(commentsCount);
    retweets.appendChild(retweetsIcon);
    retweets.appendChild(retweetsCount);
    likes.appendChild(likesIcon);
    likes.appendChild(likesCount);
    impressions.appendChild(impressionsIcon);
    impressions.appendChild(impressionsCount);

    div.appendChild(tweetWrap);
  }
}

function listUser(user) {
  const ul = document.getElementById('twitter-response');
  ul.innerHTML = '';
  const username = document.createElement('li');
  username.innerText = `Username: ${user[0].username} \n
    Nome: ${user[0].name} \n
    Descrição: ${user[0].description} \n
    Entrou em ${user[0].created_at}`;
  ul.appendChild(username);
}

function nothingFound(query) {
  const response = document.getElementById('response-body');
  response.innerHTML = '';
  const div = document.getElementById('found-nothing');
  div.classList.remove('hidden-class');
  const p2 = document.getElementById('p2');
  p2.innerText = 'para "' + query + '"';
}

function organizeTweets(tweets) {
  let organizedTweets = [];
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
          }
        });
      });
    }
    organizedTweets.push(tweet);
  }
  return organizedTweets;
}
